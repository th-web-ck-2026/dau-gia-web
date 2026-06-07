import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

import { LeftOutlined } from "@ant-design/icons";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Loading } from "@/components/common";
import LanguageAction from "@/components/layouts/header/language";
import { useAuth } from "@/hooks/common";
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
  const router = useRouter();
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitializing, router]);

  if (isInitializing || isAuthenticated) {
    return <Loading />;
  }

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
