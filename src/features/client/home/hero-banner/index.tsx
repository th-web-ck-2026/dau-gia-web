"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import HeroBannerImage from "@/assets/images/home/hero-banner.png";
import { useAuth } from "@/hooks/common";
import { useRouter } from "@/i18n/routing";

import * as S from "./index.styles";

const HeroBanner = () => {
  const t = useTranslations("home");
  const { isAuthenticated } = useAuth();
  const { push } = useRouter();

  return (
    <S.BannerWrapper>
      <Image
        src={HeroBannerImage}
        alt="Hero Banner"
        priority
        placeholder="blur"
        sizes="100vw"
        quality={100}
      />
      <S.BannerContent>
        <div className="box-content">
          <div className="heading">
            <div className="title">
              <div>{t("heroTitle")}</div>
            </div>
            <div className="slogan">
              <div>{t("heroSloganAuction")}</div>
              <div>{t("heroSloganTender")}</div>
            </div>
          </div>
          <div className="box-action">
            <S.Button type="primary" onClick={() => push("/sessions")}>
              {t("heroExploreBtn")}
            </S.Button>
            {!isAuthenticated && (
              <S.Button onClick={() => push("/auth/register")}>
                {t("heroRegisterBtn")}
              </S.Button>
            )}
          </div>
        </div>
      </S.BannerContent>
    </S.BannerWrapper>
  );
};

export default HeroBanner;
