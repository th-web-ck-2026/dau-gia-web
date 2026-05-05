import React from "react";
import AuthElement from "@/assets/svg/auth/element-1.svg";
import * as S from "./index.styles";

interface AuthLayoutProps {
  children: React.ReactNode;
  reversed?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, reversed = false }) => {
  return (
    <S.AuthLayoutContainer $reversed={reversed}>
      <S.BannerSection lg={12} md={0} sm={0} xs={0}>
        <S.BannerContent>
          <S.ElementWrapper>
            <AuthElement />
          </S.ElementWrapper>
        </S.BannerContent>
      </S.BannerSection>
      <S.FormSection lg={12} md={24} sm={24} xs={24}>
        <S.FormWrapper>
          {children}
        </S.FormWrapper>
      </S.FormSection>
    </S.AuthLayoutContainer>
  );
};
