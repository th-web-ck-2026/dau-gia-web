"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { TeamOutlined } from "@ant-design/icons";

import { BaseButton } from "@/components/common/base-button";
import type { TenderSession } from "@/interfaces/sessions";
import { convertAmountToDateTime } from "@/utils/common";

import * as S from "./index.styles";

interface TenderCardProps {
  data: TenderSession;
  onSubmit?: (id: string) => void;
}

const FALLBACK_IMAGE = "/images/assets-default.png";

const TenderCard = ({ data, onSubmit }: TenderCardProps) => {
  const t = useTranslations("home");

  const handleSubmit = () => {
    onSubmit?.(data._id);
  };

  return (
    <S.CardWrapper>
      <S.TenderImageWrapper>
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
      </S.TenderImageWrapper>

      <S.CardBody>
        <S.StatusBadge>{t("statusOpen")}</S.StatusBadge>

        <S.CardTitle ellipsis={{ rows: 1, tooltip: data.tieuDe }}>
          {data.tieuDe}
        </S.CardTitle>

        {data.moTa && (
          <S.CardDescription ellipsis={{ rows: 2, tooltip: data.moTa }}>
            {data.moTa}
          </S.CardDescription>
        )}

        <S.CardFieldList>
          <S.CardField>
            <S.FieldLabel>{t("deadline")}:</S.FieldLabel>
            <S.FieldValue>
              {convertAmountToDateTime(data.thoiGianBatDau)} -{" "}
              {convertAmountToDateTime(data.thoiGianKetThuc)}
            </S.FieldValue>
          </S.CardField>
        </S.CardFieldList>

        <S.CardFooter>
          <S.BidCountText>
            <TeamOutlined />
            {`${data.soLuongNguoiThamGia ?? 0} ${t("participantCount")}`}
          </S.BidCountText>
          <BaseButton type="primary" size="small" onClick={handleSubmit}>
            {t("submitProposal")}
          </BaseButton>
        </S.CardFooter>
      </S.CardBody>
    </S.CardWrapper>
  );
};

export default TenderCard;
