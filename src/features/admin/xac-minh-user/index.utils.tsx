import React from "react";

import { EyeOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

import { AdminXacMinhUserData } from "@/api/admin";
import { BaseButton, BaseSpace, BaseTag } from "@/components/common";
import { TrangThaiXacMinhUser } from "@/constants";
import { formatDate } from "@/constants/common";

export const getStatusTagColor = (status: string) => {
  switch (status) {
    case TrangThaiXacMinhUser.CHO_DUYET:
      return "warning";
    case TrangThaiXacMinhUser.DUYET:
      return "success";
    case TrangThaiXacMinhUser.TU_CHOI:
      return "error";
    default:
      return "default";
  }
};

export const getColumns = (
  t: (key: string) => string,
  handleReview: (record: AdminXacMinhUserData) => void
): ColumnsType<AdminXacMinhUserData> => [
  {
    title: t("verification.table.fullname"),
    dataIndex: ["user", "fullname"],
    key: "fullname",
    render: (text, record) => text || record.user?.email?.split("@")[0] || "-",
  },
  {
    title: t("verification.table.email"),
    dataIndex: ["user", "email"],
    key: "email",
    render: (text) => text || "-",
  },
  {
    title: t("verification.table.phone"),
    dataIndex: ["user", "phone"],
    key: "phone",
    render: (text) => text || "-",
  },
  {
    title: t("verification.table.createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date) => formatDate(date),
  },
  {
    title: t("verification.table.status"),
    dataIndex: "trangThai",
    key: "trangThai",
    render: (status: string) => (
      <BaseTag color={getStatusTagColor(status)}>{status}</BaseTag>
    ),
  },
  {
    title: t("verification.table.actions"),
    key: "actions",
    align: "center",
    render: (_, record) => (
      <BaseSpace size="middle">
        <BaseButton
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleReview(record)}
        >
          {t("verification.modal.viewDetail")}
        </BaseButton>
      </BaseSpace>
    ),
  },
];
