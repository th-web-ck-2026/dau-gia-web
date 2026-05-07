import React from "react";
import * as S from "./index.styles";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import LanguageAction from "@/components/layouts/language";

interface AuthLayoutProps {
  children: React.ReactNode;
  reversed?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, reversed = false }) => {
  return (
    <S.AuthLayoutContainer $reversed={reversed}>
      <S.BannerSection lg={12} md={0} sm={0} xs={0}>
        <S.BannerContent>
          <DotLottieReact src="/lotties/auth.lottie" loop autoplay />
        </S.BannerContent>
      </S.BannerSection>
      <S.FormSection lg={12} md={24} sm={24} xs={24}>
        <S.LanguageWrapper $reversed={reversed}>
          <LanguageAction />
        </S.LanguageWrapper>
        <S.FormWrapper>
          {children}
        </S.FormWrapper>
      </S.FormSection>
    </S.AuthLayoutContainer>
  );
};
