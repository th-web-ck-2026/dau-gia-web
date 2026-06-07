"use client";

import React from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { TeamOutlined, UserOutlined } from "@ant-design/icons";

import { BaseButton } from "@/components/common/base-button";
import SessionStatus from "@/components/features/client/session-status";
import { TrangThaiPhien } from "@/constants";
import { LoaiPhien } from "@/constants/scoring";
import { useAuth } from "@/hooks/common/useAuth";
import { useRouter } from "@/i18n/routing";
import type { AuctionSession, TenderSession } from "@/interfaces/sessions";
import { convertAmountToDateTime, formatCurrency } from "@/utils/common";

import * as S from "./SessionCard.styles";

interface SessionCardProps {
  type: LoaiPhien;
  data: AuctionSession | TenderSession;
  onViewDetail?: (id: string, type: LoaiPhien) => void;
}

const FALLBACK_IMAGE = "/images/assets-default.png";

const SessionCard: React.FC<SessionCardProps> = ({
  type,
  data,
  onViewDetail,
}) => {
  const tHome = useTranslations("client.home");
  const tSessions = useTranslations("sessions");

  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleViewDetail = () => {
    if (!isAuthenticated) return;
    if (onViewDetail) {
      onViewDetail(data._id, type);
    } else {
      router.push(`/sessions/${data._id}`);
    }
  };

  const showParticipant =
    data.trangThai === TrangThaiPhien.MO ||
    data.trangThai === TrangThaiPhien.DONG;

  const isAuction = type === LoaiPhien.DAU_GIA;
  const auctionData = data as AuctionSession;

  return (
    <S.CardWrapper
      onClick={isAuthenticated ? handleViewDetail : undefined}
      style={{ cursor: isAuthenticated ? "pointer" : "default" }}
    >
      <S.CardImageWrapper>
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
        <S.TagOverlayLeft>
          <SessionStatus status={data.trangThai} />
        </S.TagOverlayLeft>
        <S.TagOverlayRight>
          <S.TypeTag>
            {isAuction ? tSessions("tabAuction") : tSessions("tabTender")}
          </S.TypeTag>
        </S.TagOverlayRight>
      </S.CardImageWrapper>

      <S.CardBody>
        <S.CardTitle ellipsis={{ rows: 1, tooltip: data.tieuDe }}>
          {data.tieuDe}
        </S.CardTitle>

        {data.moTa && (
          <S.CardDescription ellipsis={{ rows: 2, tooltip: data.moTa }}>
            {data.moTa}
          </S.CardDescription>
        )}

        <S.CardFieldList>
          {isAuction && (
            <S.CardField>
              <S.FieldLabel>{tHome("startPrice")}:</S.FieldLabel>
              <S.FieldValue>
                {formatCurrency(auctionData.giaKhoiDiem)}
              </S.FieldValue>
            </S.CardField>
          )}

          <S.CardField>
            <S.FieldLabel>
              {isAuction ? tHome("organizeTime") : tHome("deadline")}:
            </S.FieldLabel>
            <S.FieldValue>
              {convertAmountToDateTime(data.thoiGianBatDau)} -{" "}
              {convertAmountToDateTime(data.thoiGianKetThuc)}
            </S.FieldValue>
          </S.CardField>
        </S.CardFieldList>

        <S.CardFooter
          style={!showParticipant ? { justifyContent: "flex-end" } : undefined}
        >
          {showParticipant && (
            <S.ParticipantCountText>
              {isAuction ? (
                <>
                  <UserOutlined />
                  {`${data.soLuongNguoiThamGia ?? 0} ${tHome("bidCount")}`}
                </>
              ) : (
                <>
                  <TeamOutlined />
                  {`${data.soLuongNguoiThamGia ?? 0} ${tHome("participantCount")}`}
                </>
              )}
            </S.ParticipantCountText>
          )}

          {isAuthenticated && (
            <BaseButton
              type="primary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetail();
              }}
            >
              {tSessions("viewDetailBtn")}
            </BaseButton>
          )}
        </S.CardFooter>
      </S.CardBody>
    </S.CardWrapper>
  );
};

export default SessionCard;
