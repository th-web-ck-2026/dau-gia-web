"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import type { KeyAssetItem } from "@/interfaces/sessions";
import { formatCurrency } from "@/utils/common";

import * as S from "./index.styles";

interface KeyAssetCardProps {
  data: KeyAssetItem;
  href?: string;
}

const FALLBACK_IMAGE = "/images/assets-default.png";

const KeyAssetCard = ({ data, href = "#" }: KeyAssetCardProps) => {
  const t = useTranslations("client.home");

  return (
    <S.KeyAssetWrapper>
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

      <S.KeyAssetOverlay />

      <S.KeyAssetContent>
        {(data.diaDiem || data.loaiTaiSan) && (
          <S.KeyAssetMeta>
            {[data.diaDiem, data.loaiTaiSan].filter(Boolean).join(" · ")}
          </S.KeyAssetMeta>
        )}

        <S.KeyAssetTitle>{data.tieuDe}</S.KeyAssetTitle>

        <S.KeyAssetFooter>
          <S.KeyAssetPrice>{formatCurrency(data.giaKhoiDiem)}</S.KeyAssetPrice>
          {data.soLuotDauGia !== undefined && (
            <S.KeyAssetBids>
              {data.soLuotDauGia} {t("bidCount")}
            </S.KeyAssetBids>
          )}
        </S.KeyAssetFooter>

        <S.KeyAssetLink href={href}>{t("viewDetail")} →</S.KeyAssetLink>
      </S.KeyAssetContent>
    </S.KeyAssetWrapper>
  );
};

export default KeyAssetCard;
