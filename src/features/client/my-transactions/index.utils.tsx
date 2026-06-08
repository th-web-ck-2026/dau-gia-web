import React from "react";

import { Button, Tag } from "antd";
import dayjs from "dayjs";

import { LoaiPhien, TrangThaiGiaoDich } from "@/constants";
import { formatCurrency, formatDate } from "@/constants/common";
import { Link } from "@/i18n/routing";
import { GiaoDich } from "@/interfaces/transaction";

export const getStatusTag = (status: TrangThaiGiaoDich, t: any) => {
  let color = "default";
  let text = status;

  switch (status) {
    case TrangThaiGiaoDich.CHO_XAC_NHAN:
      color = "warning";
      text = t("status.CHO_XAC_NHAN");
      break;
    case TrangThaiGiaoDich.CHO_THANH_TOAN:
      color = "processing";
      text = t("status.CHO_THANH_TOAN");
      break;
    case TrangThaiGiaoDich.DA_THANH_TOAN:
      color = "cyan";
      text = t("status.DA_THANH_TOAN");
      break;
    case TrangThaiGiaoDich.CHO_KY_HOP_DONG:
      color = "purple";
      text = t("status.CHO_KY_HOP_DONG");
      break;
    case TrangThaiGiaoDich.DA_KY_HOP_DONG:
      color = "geekblue";
      text = t("status.DA_KY_HOP_DONG");
      break;
    case TrangThaiGiaoDich.DANG_BAN_GIAO:
      color = "gold";
      text = t("status.DANG_BAN_GIAO");
      break;
    case TrangThaiGiaoDich.HOAN_TAT:
      color = "success";
      text = t("status.HOAN_TAT");
      break;
    case TrangThaiGiaoDich.THAT_BAI:
      color = "error";
      text = t("status.THAT_BAI");
      break;
    case TrangThaiGiaoDich.DA_HUY:
      color = "default";
      text = t("status.DA_HUY");
      break;
  }

  return <Tag color={color}>{text}</Tag>;
};

export const getColumns = (t: any, currentUserId: string) => [
  {
    title: t("table.id"),
    dataIndex: "_id",
    key: "_id",
    render: (id: string) => (
      <span style={{ fontFamily: "monospace" }}>{id}</span>
    ),
  },
  {
    title: t("table.sessionType"),
    dataIndex: "loaiPhien",
    key: "loaiPhien",
    render: (type: LoaiPhien) =>
      type === LoaiPhien.DAU_GIA ? (
        <Tag color="blue">{t("sessionType.auction")}</Tag>
      ) : (
        <Tag color="green">{t("sessionType.tender")}</Tag>
      ),
  },
  {
    title: t("table.myRole"),
    key: "myRole",
    render: (_: any, record: GiaoDich) => {
      const isWinner = record.nguoiThangId === currentUserId;
      return isWinner ? (
        <Tag color="geekblue">{t("role.winner")}</Tag>
      ) : (
        <Tag color="orange">{t("role.host")}</Tag>
      );
    },
  },
  {
    title: t("table.finalPrice"),
    dataIndex: "giaChot",
    key: "giaChot",
    render: (price: number) => (price ? formatCurrency(price, "VND") : "-"),
  },
  {
    title: t("table.status"),
    dataIndex: "trangThai",
    key: "trangThai",
    render: (status: TrangThaiGiaoDich) => getStatusTag(status, t),
  },
  {
    title: t("table.deadline"),
    key: "deadline",
    render: (_: any, record: GiaoDich) => {
      if (record.trangThai === TrangThaiGiaoDich.CHO_XAC_NHAN) {
        const diffMin = dayjs(record.hanXacNhan).diff(dayjs(), "minute");
        if (diffMin <= 0) {
          return (
            <span style={{ color: "#ff4d4f", fontWeight: 600 }}>
              {t("table.expired")}
            </span>
          );
        }
        const hours = Math.floor(diffMin / 60);
        const mins = diffMin % 60;
        return (
          <span style={{ color: "#faad14", fontWeight: 600 }}>
            {t("table.timeLeft", { hours, mins })}
          </span>
        );
      }
      return formatDate(record.createdAt);
    },
  },
  {
    title: t("table.action"),
    key: "action",
    render: (_: any, record: GiaoDich) => (
      <Link href={`/my-transactions/${record._id}`}>
        <Button type="primary" size="small">
          {t("table.viewDetail")}
        </Button>
      </Link>
    ),
  },
];
