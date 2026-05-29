import { useTranslations } from "next-intl";

import AuctionIconSvg from "@/assets/svg/home/auction-icon.svg";
import TenderIconSvg from "@/assets/svg/home/tender.svg";
import { BaseButton } from "@/components/common/base-button";
import { LoaiPhien } from "@/constants/scoring";

import * as S from "./index.styles";

interface NavigationButtonsProps {
  activeTab: LoaiPhien;
  onChange: (tab: LoaiPhien) => void;
}

export const NavigationButtons = ({
  activeTab,
  onChange,
}: NavigationButtonsProps) => {
  const t = useTranslations("home");

  return (
    <S.ButtonsRow>
      <BaseButton
        type={activeTab === LoaiPhien.DAU_GIA ? "primary" : "default"}
        size="large"
        icon={<AuctionIconSvg />}
        style={{ height: 52, borderRadius: 26, paddingInline: 28 }}
        onClick={() => onChange(LoaiPhien.DAU_GIA)}
      >
        {t("auctionBtn")}
      </BaseButton>

      <BaseButton
        type={activeTab === LoaiPhien.DAU_THAU ? "primary" : "default"}
        size="large"
        icon={<TenderIconSvg />}
        style={{ height: 52, borderRadius: 26, paddingInline: 28 }}
        onClick={() => onChange(LoaiPhien.DAU_THAU)}
      >
        {t("tenderBtn")}
      </BaseButton>
    </S.ButtonsRow>
  );
};
