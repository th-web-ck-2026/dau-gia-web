"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { UserOutlined } from "@ant-design/icons";

import { BaseButton } from "@/components/common/base-button";
import SessionStatus from "@/components/features/client/session-status";
import type { AuctionSession } from "@/interfaces/sessions";
import { convertAmountToDateTime, formatCurrency } from "@/utils/common";

import * as S from "./index.styles";

interface AuctionCardProps {
  data: AuctionSession;
  onViewDetail?: (id: string) => void;
  showBidCount?: boolean;
}

const FALLBACK_IMAGE = "/images/assets-default.png";

const AuctionCard = ({
  data,
  onViewDetail,
  showBidCount = true,
}: AuctionCardProps) => {
  const t = useTranslations("client.home");

  const handleViewDetail = () => {
    onViewDetail?.(data._id);
  };

  return (
    <S.CardWrapper>
      <S.AuctionImageWrapper>
        <Image
          src={data.danhSachHinhAnh?.[0] || FALLBACK_IMAGE}
          alt={data.tieuDe}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
          style={{ objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
        />
      </S.AuctionImageWrapper>

      <S.CardBody>
        <SessionStatus status={data.trangThai} />

        <S.CardTitle ellipsis={{ rows: 1, tooltip: data.tieuDe }}>
          {data.tieuDe}
        </S.CardTitle>

        <S.CardFieldList>
          <S.CardField>
            <S.FieldLabel>{t("startPrice")}:</S.FieldLabel>
            <S.FieldValue>{formatCurrency(data.giaKhoiDiem)}</S.FieldValue>
          </S.CardField>
          <S.CardField>
            <S.FieldLabel>{t("organizeTime")}:</S.FieldLabel>
            <S.FieldValue>
              {convertAmountToDateTime(data.thoiGianBatDau)} -{" "}
              {convertAmountToDateTime(data.thoiGianKetThuc)}
            </S.FieldValue>
          </S.CardField>
        </S.CardFieldList>

        <S.CardFooter
          style={!showBidCount ? { justifyContent: "flex-end" } : undefined}
        >
          {showBidCount && (
            <S.BidCountText>
              <UserOutlined />
              {data?.soLuongNguoiThamGia
                ? `${data.soLuongNguoiThamGia} ${t("bidCount")}`
                : `0 ${t("bidCount")}`}
            </S.BidCountText>
          )}
          <BaseButton type="primary" size="small" onClick={handleViewDetail}>
            {t("viewDetail")}
          </BaseButton>
        </S.CardFooter>
      </S.CardBody>
    </S.CardWrapper>
  );
};

export default AuctionCard;
