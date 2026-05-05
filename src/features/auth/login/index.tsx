"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  BaseForm,
  BaseInput,
  BaseButton,
  InputPassword,
  BaseDivider
} from "@/components/common";
import { AuthLayout } from "../shared/AuthLayout";
import { useLoginHooks } from "./index.hooks";
import { useLoginUtils } from "./index.utils";
import * as S from "./index.styles";
import BidwarLogo from "@/assets/svg/bidwar-text-brand.svg";
import GoogleIcon from "@/assets/svg/auth/google-icon";

const LoginPage: React.FC = () => {
  const t = useTranslations("auth");
  const { handleLogin, isLoading } = useLoginHooks();
  const { validationRules } = useLoginUtils();

  return (
    <AuthLayout>
      <BidwarLogo style={{ marginBottom: "12px" }} />
      <S.Title level={1}>{t("loginTitle")}</S.Title>
      <S.SubTitle>{t("loginSubTitle")}</S.SubTitle>

      <BaseForm layout="vertical" onFinish={handleLogin}>
        <BaseForm.Item
          name="email"
          label={t("emailLabel")}
          rules={validationRules.email}
        >
          <BaseInput placeholder={t("emailPlaceholder")} size="large" />
        </BaseForm.Item>

        <BaseForm.Item
          name="password"
          label={t("passwordLabel")}
          rules={validationRules.password}
        >
          <InputPassword placeholder={t("passwordPlaceholder")} size="large" />
        </BaseForm.Item>

        <S.ForgotPasswordWrapper>
          <Link href="/auth/forgot-password">{t("forgotPassword")}</Link>
        </S.ForgotPasswordWrapper>

        <BaseForm.Item>
          <BaseButton
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            {t("loginButton")}
          </BaseButton>
        </BaseForm.Item>
      </BaseForm>

      <BaseDivider>{t("or")}</BaseDivider>

      <BaseButton icon={<GoogleIcon />}>
        {t("googleLogin")}
      </BaseButton>

      <S.FooterText>
        {t("noAccount")}{" "}
        <Link href="/auth/register">{t("registerNow")}</Link>
      </S.FooterText>
    </AuthLayout>
  );
};

export default LoginPage;