"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { TeamOutlined } from "@ant-design/icons";

import { BaseButton } from "@/components/common/base-button";
import type { TenderSession } from "@/interfaces/home";
import { convertAmountToDateTime, formatCurrency } from "@/utils/common";

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
          src={data.anhDaiDien || FALLBACK_IMAGE}
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

        <S.CardTitle>{data.tieuDe}</S.CardTitle>

        {data.moTa && <S.CardDescription>{data.moTa}</S.CardDescription>}

        <S.CardFieldList>
          {data.giaToiDa && (
            <S.CardField>
              <S.FieldLabel>{t("budget")}:</S.FieldLabel>
              <S.FieldValue>{formatCurrency(data.giaToiDa)}</S.FieldValue>
            </S.CardField>
          )}
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
            {`${data.soNguoiThamGia ?? 0} ${t("participantCount")}`}
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
