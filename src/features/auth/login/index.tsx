"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  BaseForm,
  BaseInput,
  BaseButton,
} from "@/components/common";
import { AuthLayout } from "../shared/AuthLayout";
import { useLoginHooks } from "./index.hooks";
import { useLoginUtils } from "./index.utils";
import * as S from "./index.styles";

const LoginPage: React.FC = () => {
  const t = useTranslations("auth");
  const { handleLogin, isLoading } = useLoginHooks();
  const { validationRules } = useLoginUtils();

  return (
    <AuthLayout>
      <S.Title level={2}>{t("loginTitle")}</S.Title>
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
          <BaseInput.Password placeholder={t("passwordPlaceholder")} size="large" />
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

      <S.FooterText>
        {t("noAccount")}{" "}
        <Link href="/auth/register">{t("registerNow")}</Link>
      </S.FooterText>
    </AuthLayout>
  );
};

export default LoginPage;