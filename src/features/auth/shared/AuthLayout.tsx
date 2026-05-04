import React from "react";
import BidwarLogo from "@/assets/svg/bidwar-text-brand.svg";
import AuthElement from "@/assets/svg/auth/element-1.svg";
import * as S from "./index.styles";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <S.AuthLayoutContainer>
      <S.BannerSection span={12}>
        <S.LogoWrapper>
          <BidwarLogo />
        </S.LogoWrapper>
        <S.ElementWrapper>
          <AuthElement />
        </S.ElementWrapper>
      </S.BannerSection>
      <S.FormSection xs={24} md={12}>
        <S.FormWrapper>
          {children}
        </S.FormWrapper>
      </S.FormSection>
    </S.AuthLayoutContainer>
  );
};
