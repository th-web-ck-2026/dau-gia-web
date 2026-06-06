import Image from "next/image";

import { EyeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import { BaseButton, BasePopconfirm, BaseSpace } from "@/components/common";
import { BaseTypography } from "@/components/common/base-typography";
import SessionStatus from "@/components/features/client/session-status";
import { LoaiPhien, SortOrder, TrangThaiPhien } from "@/constants";
import { ApiError } from "@/interfaces";
import { AuctionSession, TenderSession } from "@/interfaces/sessions";
import { formatNumber } from "@/utils/number";

import * as S from "./index.styles";

export interface SelectedSession {
  id: string;
  title: string;
  type: LoaiPhien;
  status: TrangThaiPhien;
  minTechnicalScore?: number;
}

export const getErrorMessage = (err: unknown): string | undefined => {
  const apiErr = err as ApiError;
  if (apiErr && apiErr.data) {
    if ("message" in apiErr.data) {
      return apiErr.data.message;
    }
  }
  return undefined;
};

export const buildQueryParams = (
  searchText: string,
  statusFilter: TrangThaiPhien | undefined,
  page: number,
  limit: number
) => {
  const condition: Record<string, unknown> = {};
  if (searchText) {
    condition.tieuDe = { $ilike: `%${searchText}%` };
  }
  if (statusFilter) {
    condition.trangThai = statusFilter;
  }
  return {
    page,
    limit,
    condition,
    order: { createdAt: SortOrder.DESC },
  };
};

export const getCommonColumns = (t: (key: string) => string) => [
  {
    title: t("tableTitle"),
    dataIndex: "tieuDe",
    key: "tieuDe",
    align: "start" as const,
    width: 350,
    render: (text: string, record: AuctionSession | TenderSession) => {
      const image = record.danhSachHinhAnh?.[0];
      return (
        <S.SessionTitleCell>
          {image && (
            <S.SessionImageWrapper>
              <Image
                src={image}
                alt={text}
                fill
                style={{ objectFit: "cover" }}
              />
            </S.SessionImageWrapper>
          )}
          <S.TitleTextWrapper>
            <BaseTypography.Paragraph
              ellipsis={{ rows: 1, tooltip: text }}
              style={{ margin: 0, fontWeight: 600 }}
            >
              {text}
            </BaseTypography.Paragraph>
            <S.SessionIdText type="secondary">ID: {record._id}</S.SessionIdText>
          </S.TitleTextWrapper>
        </S.SessionTitleCell>
      );
    },
  },
  {
    title: t("tableStatus"),
    dataIndex: "trangThai",
    key: "trangThai",
    width: 130,
    align: "start" as const,
    render: (status: TrangThaiPhien) => <SessionStatus status={status} />,
  },
  {
    title: t("tableTime"),
    key: "time",
    width: 280,
    align: "start" as const,
    render: (_: unknown, record: AuctionSession | TenderSession) => (
      <S.TimeCellWrapper>
        <div>
          <S.TimeLabel>{t("startTimeLabel")}</S.TimeLabel>{" "}
          {dayjs(record.thoiGianBatDau).format("HH:mm DD/MM/YYYY")}
        </div>
        <div>
          <S.TimeLabel>{t("endTimeLabel")}</S.TimeLabel>{" "}
          {dayjs(record.thoiGianKetThuc).format("HH:mm DD/MM/YYYY")}
        </div>
      </S.TimeCellWrapper>
    ),
  },
];

export const getAuctionColumns = (
  t: (key: string) => string,
  handlePublish: (id: string, type: LoaiPhien) => void,
  handleOpenDrawer: (record: AuctionSession, type: LoaiPhien) => void
) => [
  ...getCommonColumns(t),
  {
    title: t("tableParams"),
    key: "params",
    width: 200,
    align: "start" as const,
    render: (_: unknown, record: AuctionSession) => (
      <S.ParamsCellWrapper>
        <div>
          <S.TimeLabel>{t("startingPriceLabel")}</S.TimeLabel>{" "}
          <strong>{formatNumber(record.giaKhoiDiem)} đ</strong>
        </div>
        <div>
          <S.TimeLabel>{t("priceStepLabel")}</S.TimeLabel>{" "}
          {formatNumber(record.buocGia)} đ
        </div>
      </S.ParamsCellWrapper>
    ),
  },
  {
    title: t("tableParticipants"),
    dataIndex: "soLuongNguoiThamGia",
    key: "soLuongNguoiThamGia",
    width: 130,
    align: "start" as const,
    render: (val: number) => val || 0,
  },
  {
    title: t("tableActions"),
    key: "actions",
    width: 180,
    align: "start" as const,
    render: (_: unknown, record: AuctionSession) => (
      <BaseSpace size="small">
        {record.trangThai === TrangThaiPhien.NHAP && (
          <BasePopconfirm
            title={t("publishConfirm")}
            onConfirm={() => handlePublish(record._id, LoaiPhien.DAU_GIA)}
            okText={t("common.confirm")}
            cancelText={t("common.cancel")}
          >
            <BaseButton
              type="primary"
              size="small"
              icon={<PlayCircleOutlined />}
            >
              {t("publishBtn")}
            </BaseButton>
          </BasePopconfirm>
        )}
        {record.trangThai === TrangThaiPhien.MO && (
          <BaseButton
            type="primary"
            size="small"
            onClick={() => handleOpenDrawer(record, LoaiPhien.DAU_GIA)}
          >
            {t("viewBidsBtn")}
          </BaseButton>
        )}
        {record.trangThai === TrangThaiPhien.DONG && (
          <BaseButton
            type="default"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleOpenDrawer(record, LoaiPhien.DAU_GIA)}
          >
            {t("viewResultsBtn")}
          </BaseButton>
        )}
      </BaseSpace>
    ),
  },
];

export const getTenderColumns = (
  t: (key: string) => string,
  handlePublish: (id: string, type: LoaiPhien) => void,
  handleOpenDrawer: (record: TenderSession, type: LoaiPhien) => void
) => [
  ...getCommonColumns(t),
  {
    title: t("tableParams"),
    key: "params",
    width: 200,
    align: "start" as const,
    render: (_: unknown, record: TenderSession) => (
      <S.ParamsCellWrapper>
        <div>
          <S.TimeLabel>{t("minScoreLabel")}</S.TimeLabel>{" "}
          <strong>{record.diemKyThuatToiThieu} / 100</strong>
        </div>
        <div>
          <S.TimeLabel>{t("criteriaCountLabel")}</S.TimeLabel>{" "}
          {record.tieuChi?.length || 0}
        </div>
      </S.ParamsCellWrapper>
    ),
  },
  {
    title: t("tableParticipants"),
    dataIndex: "soLuongNguoiThamGia",
    key: "soLuongNguoiThamGia",
    width: 130,
    align: "start" as const,
    render: (val: number) => val || 0,
  },
  {
    title: t("tableActions"),
    key: "actions",
    width: 180,
    align: "start" as const,
    render: (_: unknown, record: TenderSession) => (
      <BaseSpace size="small">
        {record.trangThai === TrangThaiPhien.NHAP && (
          <BasePopconfirm
            title={t("publishConfirm")}
            onConfirm={() => handlePublish(record._id, LoaiPhien.DAU_THAU)}
            okText={t("common.confirm")}
            cancelText={t("common.cancel")}
          >
            <BaseButton
              type="primary"
              size="small"
              icon={<PlayCircleOutlined />}
            >
              {t("publishBtn")}
            </BaseButton>
          </BasePopconfirm>
        )}
        {record.trangThai === TrangThaiPhien.MO && (
          <BaseButton
            type="primary"
            size="small"
            onClick={() => handleOpenDrawer(record, LoaiPhien.DAU_THAU)}
          >
            {t("viewSubmissionsBtn")}
          </BaseButton>
        )}
        {record.trangThai === TrangThaiPhien.DONG && (
          <BaseButton
            type="default"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleOpenDrawer(record, LoaiPhien.DAU_THAU)}
          >
            {t("viewResultsBtn")}
          </BaseButton>
        )}
      </BaseSpace>
    ),
  },
];

export const getDrawerAuctionColumns = (t: (key: string) => string) => [
  {
    title: t("colNo"),
    key: "index",
    width: 60,
    align: "start" as const,
    render: (_: unknown, __: unknown, index: number) => index + 1,
  },
  {
    title: t("colParticipant"),
    dataIndex: "nguoiThamGia",
    key: "nguoiThamGia",
    align: "start" as const,
    render: (val: { fullname?: string } | undefined) =>
      val?.fullname || t("anonymousBidder"),
  },
  {
    title: t("colBidPrice"),
    dataIndex: "giaDat",
    key: "giaDat",
    align: "start" as const,
    render: (val: number) => <strong>{formatNumber(val)} đ</strong>,
  },
  {
    title: t("colBidTime"),
    dataIndex: "thoiDiemDat",
    key: "thoiDiemDat",
    align: "start" as const,
    render: (val: string) => dayjs(val).format("HH:mm:ss DD/MM/YYYY"),
  },
];

export const getDrawerTenderColumns = (t: (key: string) => string) => [
  {
    title: t("colRank"),
    dataIndex: "thuHang",
    key: "thuHang",
    width: 60,
    align: "start" as const,
    render: (val: number) => val || "-",
  },
  {
    title: t("colBidder"),
    dataIndex: "nguoiThamGia",
    key: "nguoiThamGia",
    align: "start" as const,
    render: (val: { fullname?: string } | undefined) =>
      val?.fullname || t("anonymousBidder"),
  },
  {
    title: t("colProposalPrice"),
    dataIndex: "giaDeXuat",
    key: "giaDeXuat",
    align: "start" as const,
    render: (val: number) => `${formatNumber(val)} đ`,
  },
  {
    title: t("colTechnicalScore"),
    dataIndex: "diemKyThuat",
    key: "diemKyThuat",
    align: "start" as const,
    render: (val: number | undefined) =>
      val !== undefined ? `${val.toFixed(1)} / 100` : "-",
  },
  {
    title: t("colPriceScore"),
    dataIndex: "diemGia",
    key: "diemGia",
    align: "start" as const,
    render: (val: number | undefined) =>
      val !== undefined ? `${val.toFixed(1)} / 100` : "-",
  },
  {
    title: t("colCombinedScore"),
    dataIndex: "diemTongHop",
    key: "diemTongHop",
    align: "start" as const,
    render: (val: number | undefined) =>
      val !== undefined ? <strong>{val.toFixed(1)}</strong> : "-",
  },
  {
    title: t("colStatus"),
    dataIndex: "trangThai",
    key: "trangThai",
    align: "start" as const,
    render: (val: string) => {
      if (val === "THANG") {
        return <S.StatusSuccessText>{t("statusWon")}</S.StatusSuccessText>;
      }
      if (val === "BI_TU_CHOI") {
        return <S.StatusDangerText>{t("statusRejected")}</S.StatusDangerText>;
      }
      return <S.StatusInfoText>{t("statusPassed")}</S.StatusInfoText>;
    },
  },
];
