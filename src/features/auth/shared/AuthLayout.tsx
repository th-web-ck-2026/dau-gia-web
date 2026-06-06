import React from "react";

import { LeftOutlined } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import LanguageAction from "@/components/layouts/header/language";
import { Link } from "@/i18n/routing";

import * as S from "./index.styles";

interface AuthLayoutProps {
  children: React.ReactNode;
  reversed?: boolean;
  backUrl?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  reversed = false,
  backUrl,
}) => {
  return (
    <S.AuthLayoutContainer $reversed={reversed}>
      {backUrl && (
        <S.BackButtonWrapper>
          <S.BackCircleLink>
            <Link href={backUrl}>
              <LeftOutlined />
            </Link>
          </S.BackCircleLink>
        </S.BackButtonWrapper>
      )}
      <S.BannerSection lg={12} md={0} sm={0} xs={0}>
        <S.BannerContent>
          <DotLottieReact src="/lotties/auth.lottie" loop autoplay />
        </S.BannerContent>
      </S.BannerSection>
      <S.FormSection lg={12} md={24} sm={24} xs={24}>
        <S.LanguageWrapper $reversed={reversed}>
          <LanguageAction />
        </S.LanguageWrapper>
        <S.FormWrapper>{children}</S.FormWrapper>
      </S.FormSection>
    </S.AuthLayoutContainer>
  );
};
