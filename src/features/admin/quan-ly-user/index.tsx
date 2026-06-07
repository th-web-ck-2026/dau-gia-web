"use client";

import React, { useCallback, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { EditOutlined } from "@ant-design/icons";
import { Select } from "antd";
import type { ColumnsType } from "antd/es/table";

import { AdminUserRow } from "@/api/admin";
import {
  BaseButton,
  BaseInput,
  BasePagination,
  BaseSpace,
  BaseTable,
  BaseTag,
} from "@/components/common";
import { formatDate } from "@/constants/common";

import { EditUserModal } from "./components/EditUserModal";
import { useGetAdminUserPage } from "./index.hooks";
import * as S from "./index.styles";

const AdminQuanLyUser: React.FC = () => {
  const t = useTranslations("admin");

  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [verifiedFilter, setVerifiedFilter] = useState<string>("ALL");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState<AdminUserRow | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Build backend condition query
  const condition: Record<string, any> = {};
  if (roleFilter !== "ALL") condition.role = roleFilter;
  if (statusFilter !== "ALL") condition.userStatus = statusFilter;
  if (typeFilter !== "ALL") condition.userRoles = typeFilter;
  if (verifiedFilter !== "ALL")
    condition.isVerified = verifiedFilter === "true";

  if (searchText.trim()) {
    const searchVal = `%${searchText.trim()}%`;
    condition.$or = [
      { fullname: { $ilike: searchVal } },
      { email: { $ilike: searchVal } },
      { phone: { $ilike: searchVal } },
    ];
  }

  const queryParams = {
    page,
    limit,
    condition,
  };

  const { data, isLoading, refetch } = useGetAdminUserPage(queryParams);

  const handleEdit = useCallback((record: AdminUserRow) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  }, []);

  const handleModalSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleSearch = useCallback((value: string) => {
    setSearchText(value);
    setPage(1);
  }, []);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchDebounced = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(e.target.value);
    }, 400);
  };

  const columns: ColumnsType<AdminUserRow> = [
    {
      title: t("verification.table.fullname") || "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => text || "-",
    },
    {
      title: t("verification.table.email") || "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "-",
    },
    {
      title: t("verification.table.phone") || "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => text || "-",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <BaseTag color={role === "ADMIN" ? "error" : "processing"}>
          {role}
        </BaseTag>
      ),
    },
    {
      title: "Loại TK",
      dataIndex: "userRoles",
      key: "userRoles",
      render: (type: string) => (
        <BaseTag color={type === "TO_CHUC" ? "warning" : "default"}>
          {type === "TO_CHUC"
            ? "Tổ chức"
            : type === "CA_NHAN"
              ? "Cá nhân"
              : "-"}
        </BaseTag>
      ),
    },
    {
      title: t("verification.table.status") || "Trạng thái",
      dataIndex: "userStatus",
      key: "userStatus",
      render: (status: string) => (
        <BaseTag color={status === "ACTIVE" ? "success" : "error"}>
          {status === "ACTIVE" ? "Hoạt động" : "Đã khóa"}
        </BaseTag>
      ),
    },
    {
      title: "Xác minh",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (isVerified: boolean) => (
        <BaseTag color={isVerified ? "success" : "default"}>
          {isVerified ? "Đã xác minh" : "Chưa xác minh"}
        </BaseTag>
      ),
    },
    {
      title: t("verification.table.createdAt") || "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => formatDate(date),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <BaseSpace size="middle">
          <BaseButton
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
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
        <S.DashboardTitle>Quản lý người dùng</S.DashboardTitle>
      </S.DashboardHeader>

      <S.FilterContainer>
        <BaseInput
          placeholder="Tìm theo họ tên, email, sđt..."
          onChange={handleSearchDebounced}
          style={{ width: 260 }}
          allowClear
        />

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "12px",
                color: "#6b7280",
                display: "block",
                marginBottom: "4px",
              }}
            >
              Vai trò
            </span>
            <Select
              value={roleFilter}
              onChange={(v) => {
                setRoleFilter(v);
                setPage(1);
              }}
              style={{ width: 120 }}
              options={[
                { value: "ALL", label: "Tất cả" },
                { value: "USER", label: "USER" },
                { value: "ADMIN", label: "ADMIN" },
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
              Trạng thái
            </span>
            <Select
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
              style={{ width: 130 }}
              options={[
                { value: "ALL", label: "Tất cả" },
                { value: "ACTIVE", label: "Hoạt động" },
                { value: "BLOCKED", label: "Bị khóa" },
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
              Loại tài khoản
            </span>
            <Select
              value={typeFilter}
              onChange={(v) => {
                setTypeFilter(v);
                setPage(1);
              }}
              style={{ width: 120 }}
              options={[
                { value: "ALL", label: "Tất cả" },
                { value: "CA_NHAN", label: "Cá nhân" },
                { value: "TO_CHUC", label: "Tổ chức" },
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
              Xác minh
            </span>
            <Select
              value={verifiedFilter}
              onChange={(v) => {
                setVerifiedFilter(v);
                setPage(1);
              }}
              style={{ width: 140 }}
              options={[
                { value: "ALL", label: "Tất cả" },
                { value: "true", label: "Đã xác minh" },
                { value: "false", label: "Chưa xác minh" },
              ]}
            />
          </div>
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

      <EditUserModal
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

export default AdminQuanLyUser;
