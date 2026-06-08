"use client";

import React, { useCallback, useState } from "react";

import { useTranslations } from "next-intl";

import { EyeOutlined } from "@ant-design/icons";
import { Select } from "antd";
import type { ColumnsType } from "antd/es/table";

import { AdminReportRow } from "@/api/admin";
import {
  BaseButton,
  BasePagination,
  BaseSpace,
  BaseTable,
} from "@/components/common";
import { formatDate } from "@/constants/common";

import { ReportDetailModal } from "./components/ReportDetailModal";
import { useGetAdminReports } from "./index.hooks";
import * as S from "./index.styles";

const TYPE_KEY_MAP: Record<string, string> = {
  LUA_DAO: "typeScam",
  SPAM: "typeSpam",
  QUAY_ROI: "typeHarass",
  NOI_DUNG_XAU: "typeBadContent",
  KHAC: "typeOther",
};

const AdminBaoCaoUser: React.FC = () => {
  const t = useTranslations("admin");

  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState<AdminReportRow | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Build condition
  const condition: Record<string, any> = {};
  if (typeFilter !== "ALL") condition.loai = typeFilter;
  if (statusFilter !== "ALL") condition.trangThai = statusFilter;

  const queryParams = { page, limit, condition };

  const { data, isLoading, refetch } = useGetAdminReports(queryParams);

  const handleView = useCallback((record: AdminReportRow) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  }, []);

  const handleModalSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const columns: ColumnsType<AdminReportRow> = [
    {
      title: t("reports.colTitle"),
      dataIndex: "tieuDe",
      key: "tieuDe",
      render: (text: string) => text || "-",
      ellipsis: true,
    },
    {
      title: t("reports.colType"),
      dataIndex: "loai",
      key: "loai",
      render: (loai: string) => (
        <S.TypeBadge>
          {t(`reports.${TYPE_KEY_MAP[loai] ?? "typeOther"}`)}
        </S.TypeBadge>
      ),
    },
    {
      title: t("reports.colReporter"),
      dataIndex: "nguoiToCaoId",
      key: "nguoiToCaoId",
      render: (id: string) => (
        <span style={{ fontFamily: "monospace", fontSize: "12px" }}>
          {id ? `${id.slice(0, 8)}…` : "-"}
        </span>
      ),
    },
    {
      title: t("reports.colReported"),
      dataIndex: "nguoiBiToCaoId",
      key: "nguoiBiToCaoId",
      render: (id: string) => (
        <span style={{ fontFamily: "monospace", fontSize: "12px" }}>
          {id ? `${id.slice(0, 8)}…` : "-"}
        </span>
      ),
    },
    {
      title: t("reports.colStatus"),
      dataIndex: "trangThai",
      key: "trangThai",
      render: (status: string) => (
        <S.StatusBadge $done={status === "DA_XU_LY"}>
          {status === "DA_XU_LY"
            ? t("reports.statusDone")
            : t("reports.statusPending")}
        </S.StatusBadge>
      ),
    },
    {
      title: t("reports.colCreatedAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => formatDate(date),
    },
    {
      title: t("reports.colActions"),
      key: "actions",
      align: "center",
      render: (_, record) => (
        <BaseSpace size="middle">
          <BaseButton
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            {t("reports.btnView")}
          </BaseButton>
        </BaseSpace>
      ),
    },
  ];

  const list = data?.data?.result || [];
  const total = data?.data?.total || 0;

  return (
    <S.ContentRoot>
      <S.DashboardHeader>
        <S.DashboardTitle>{t("reports.title")}</S.DashboardTitle>
      </S.DashboardHeader>

      <S.FilterContainer>
        <div>
          <span
            style={{
              fontSize: "12px",
              color: "#6b7280",
              display: "block",
              marginBottom: "4px",
            }}
          >
            {t("reports.filterType")}
          </span>
          <Select
            value={typeFilter}
            onChange={(v) => {
              setTypeFilter(v);
              setPage(1);
            }}
            style={{ width: 150 }}
            options={[
              { value: "ALL", label: t("reports.allTypes") },
              { value: "LUA_DAO", label: t("reports.typeScam") },
              { value: "SPAM", label: t("reports.typeSpam") },
              { value: "QUAY_ROI", label: t("reports.typeHarass") },
              { value: "NOI_DUNG_XAU", label: t("reports.typeBadContent") },
              { value: "KHAC", label: t("reports.typeOther") },
            ]}
          />
        </div>

        <div>
          <span
            style={{
              fontSize: "12px",
              color: "#6b7280",
              display: "block",
              marginBottom: "4px",
            }}
          >
            {t("reports.filterStatus")}
          </span>
          <Select
            value={statusFilter}
            onChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
            style={{ width: 150 }}
            options={[
              { value: "ALL", label: t("reports.allStatus") },
              { value: "CHUA_XU_LY", label: t("reports.statusPending") },
              { value: "DA_XU_LY", label: t("reports.statusDone") },
            ]}
          />
        </div>
      </S.FilterContainer>

      <S.TableCard>
        <BaseTable
          loading={isLoading}
          dataSource={list}
          columns={columns}
          rowKey={(record) => record._id}
          pagination={false}
        />
        <S.PaginationWrapper>
          <BasePagination
            current={page}
            pageSize={limit}
            total={total}
            showSizeChanger
            onChange={(p, l) => {
              setPage(p);
              setLimit(l);
            }}
          />
        </S.PaginationWrapper>
      </S.TableCard>

      <ReportDetailModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        }}
        record={selectedRecord}
        onSuccess={handleModalSuccess}
      />
    </S.ContentRoot>
  );
};

export default AdminBaoCaoUser;
