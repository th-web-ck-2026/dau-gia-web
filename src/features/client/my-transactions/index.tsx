"use client";

import React, { useMemo, useState } from "react";

import { useTranslations } from "next-intl";

import { Space } from "antd";

import {
  BasePagination,
  BaseSelect,
  BaseTable,
  BaseTabs,
} from "@/components/common";
import { LoaiPhien, TrangThaiGiaoDich } from "@/constants";
import { useAuth } from "@/hooks/common";

import { useGetTransactionsMe } from "./index.hooks";
import * as S from "./index.styles";
import { getColumns } from "./index.utils";

const MyTransactionsDashboard: React.FC = () => {
  const t = useTranslations("myTransactions");
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"won" | "hosted">("won");
  const [status, setStatus] = useState<TrangThaiGiaoDich | "ALL">("ALL");
  const [type, setType] = useState<LoaiPhien | "ALL">("ALL");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const queryParams = useMemo(() => {
    const condition: Record<string, any> = {};
    if (status !== "ALL") condition.trangThai = status;
    if (type !== "ALL") condition.loaiPhien = type;

    return {
      page,
      limit,
      condition,
    };
  }, [status, type, page, limit]);

  const { data, isLoading } = useGetTransactionsMe(queryParams);

  const rawList = Array.isArray(data?.result) ? data.result : [];

  const filteredList = useMemo(() => {
    if (!user) return [];
    return rawList.filter((item) => {
      if (activeTab === "won") {
        return item.nguoiThangId === user._id;
      } else {
        return item.chuPhienId === user._id;
      }
    });
  }, [rawList, activeTab, user]);

  const total = filteredList.length;

  const columns = useMemo(() => {
    return getColumns(t, user?._id || "");
  }, [t, user]);

  const statusOptions = [
    { value: "ALL", label: t("filters.allStatus") },
    { value: TrangThaiGiaoDich.CHO_XAC_NHAN, label: t("status.CHO_XAC_NHAN") },
    {
      value: TrangThaiGiaoDich.CHO_THANH_TOAN,
      label: t("status.CHO_THANH_TOAN"),
    },
    {
      value: TrangThaiGiaoDich.DA_THANH_TOAN,
      label: t("status.DA_THANH_TOAN"),
    },
    {
      value: TrangThaiGiaoDich.CHO_KY_HOP_DONG,
      label: t("status.CHO_KY_HOP_DONG"),
    },
    {
      value: TrangThaiGiaoDich.DA_KY_HOP_DONG,
      label: t("status.DA_KY_HOP_DONG"),
    },
    {
      value: TrangThaiGiaoDich.DANG_BAN_GIAO,
      label: t("status.DANG_BAN_GIAO"),
    },
    { value: TrangThaiGiaoDich.HOAN_TAT, label: t("status.HOAN_TAT") },
    { value: TrangThaiGiaoDich.THAT_BAI, label: t("status.THAT_BAI") },
    { value: TrangThaiGiaoDich.DA_HUY, label: t("status.DA_HUY") },
  ];

  const typeOptions = [
    { value: "ALL", label: t("filters.allTypes") },
    { value: LoaiPhien.DAU_GIA, label: t("sessionType.auction") },
    { value: LoaiPhien.DAU_THAU, label: t("sessionType.tender") },
  ];

  const tabItems = [
    {
      key: "won",
      label: t("tabs.won"),
      children: null,
    },
    {
      key: "hosted",
      label: t("tabs.hosted"),
      children: null,
    },
  ];

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>

      <S.CardWrapper>
        <S.FiltersWrapper>
          <div style={{ flex: 1 }}>
            <BaseTabs
              activeKey={activeTab}
              onChange={(key) => {
                setActiveTab(key as "won" | "hosted");
                setPage(1);
              }}
              items={tabItems}
              style={{ marginBottom: 0 }}
            />
          </div>

          <Space size="middle">
            <BaseSelect
              value={type}
              onChange={(value) => {
                setType(value as LoaiPhien | "ALL");
                setPage(1);
              }}
              options={typeOptions}
              style={{ width: 180 }}
            />
            <BaseSelect
              value={status}
              onChange={(value) => {
                setStatus(value as TrangThaiGiaoDich | "ALL");
                setPage(1);
              }}
              options={statusOptions}
              style={{ width: 220 }}
            />
          </Space>
        </S.FiltersWrapper>

        <BaseTable
          loading={isLoading}
          dataSource={filteredList}
          columns={columns}
          rowKey={(record) => record._id}
          pagination={false}
        />

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}
        >
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
        </div>
      </S.CardWrapper>
    </S.Container>
  );
};

export default MyTransactionsDashboard;
