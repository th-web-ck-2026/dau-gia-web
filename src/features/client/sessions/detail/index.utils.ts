import { TableColumnsType } from "antd";
import dayjs from "dayjs";

import { UserRoleType } from "@/constants";
import { User } from "@/interfaces/auth";

export const formatVND = (value?: number | string) => {
  if (value === undefined || value === null) return "0đ";
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "0đ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(num);
};

export const formatDate = (
  date?: string | Date,
  formatStr = "DD/MM/YYYY HH:mm:ss"
) => {
  if (!date) return "-";
  return dayjs(date).format(formatStr);
};

export const getUserDisplayName = (
  user?: Partial<User> | null,
  fallback = ""
) => {
  if (!user) return fallback;
  if (
    user.userRoles === UserRoleType.TO_CHUC &&
    user.toChucProfile?.tenToChuc
  ) {
    return user.toChucProfile.tenToChuc;
  }
  return user.fullname || fallback;
};

export interface AuctionRankingRecord {
  thuHang: number;
  nguoiThamGiaId: string;
  bietDanh?: string;
  giaDat: number | string;
  soLuotBid: number;
  thoiDiemDat: string;
  trangThai: string;
  nguoiThamGia?: Partial<User> | null;
}

export interface TenderRankingRecord {
  thuHang: number;
  nguoiThamGiaId: string;
  bietDanh?: string;
  diemKyThuat: number;
  diemGia: number;
  diemTongHop: number;
  trangThai: string;
  nguoiThamGia?: Partial<User> | null;
}

export const getAuctionRankingColumns = (
  t: (key: string, values?: Record<string, string | number>) => string
): TableColumnsType<AuctionRankingRecord> => [
  {
    title: t("colRank") || "Thứ hạng",
    dataIndex: "thuHang",
    key: "thuHang",
    align: "center",
    width: 90,
    render: (rank: number) => {
      if (rank === 1) return "🥇 1";
      if (rank === 2) return "🥈 2";
      if (rank === 3) return "🥉 3";
      return rank;
    },
  },
  {
    title: t("colBidder") || "Người tham gia",
    dataIndex: "bietDanh",
    key: "bietDanh",
    render: (_, record) =>
      getUserDisplayName(record.nguoiThamGia, record.bietDanh),
  },
  {
    title: t("bidsCount") || "Lượt đấu",
    dataIndex: "soLuotBid",
    key: "soLuotBid",
    align: "center",
    width: 110,
  },
  {
    title: t("highestBid") || "Giá ra giá (VND)",
    dataIndex: "giaDat",
    key: "giaDat",
    align: "right",
    render: (val) => formatVND(val),
  },
  {
    title: t("colBidTime") || "Thời điểm đặt",
    dataIndex: "thoiDiemDat",
    key: "thoiDiemDat",
    render: (val) => formatDate(val),
  },
];

export const getTenderRankingColumns = (
  t: (key: string, values?: Record<string, string | number>) => string
): TableColumnsType<TenderRankingRecord> => [
  {
    title: t("colRank") || "Thứ hạng",
    dataIndex: "thuHang",
    key: "thuHang",
    align: "center",
    width: 90,
    render: (rank: number) => {
      if (rank === 1) return "🥇 1";
      if (rank === 2) return "🥈 2";
      if (rank === 3) return "🥉 3";
      return rank;
    },
  },
  {
    title: t("colBidder") || "Nhà thầu",
    dataIndex: "bietDanh",
    key: "bietDanh",
    render: (_, record) =>
      getUserDisplayName(record.nguoiThamGia, record.bietDanh),
  },
  {
    title: t("colTechnicalScore") || "Điểm kỹ thuật",
    dataIndex: "diemKyThuat",
    key: "diemKyThuat",
    align: "center",
    render: (val) =>
      val !== undefined && val !== null ? t("scoreUnit", { score: val }) : "-",
  },
  {
    title: t("colPriceScore") || "Điểm giá",
    dataIndex: "diemGia",
    key: "diemGia",
    align: "center",
    render: (val) =>
      val !== undefined && val !== null ? t("scoreUnit", { score: val }) : "-",
  },
  {
    title: t("colCombinedScore") || "Điểm tổng hợp",
    dataIndex: "diemTongHop",
    key: "diemTongHop",
    align: "center",
    render: (val) =>
      val !== undefined && val !== null ? t("scoreUnit", { score: val }) : "-",
  },
];
