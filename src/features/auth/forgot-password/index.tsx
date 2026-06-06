"use client";
import React from "react";

import { useTranslations } from "next-intl";

import BidwarLogo from "@/assets/svg/bidwar-text-brand.svg";
import { BaseButton, BaseForm, BaseInput } from "@/components/common";
import { Link } from "@/i18n/routing";

import { AuthLayout } from "../shared/AuthLayout";
import { useForgotPasswordHooks } from "./index.hooks";
import * as S from "./index.styles";
import { useForgotPasswordUtils } from "./index.utils";

const ForgotPasswordPage: React.FC = () => {
  const t = useTranslations("auth");
  const { form, handleForgotPassword, isLoading } = useForgotPasswordHooks();
  const { validationRules, initialValues } = useForgotPasswordUtils();

  return (
    <AuthLayout backUrl="/auth/login">
      <BidwarLogo style={{ marginBottom: "12px" }} />
      <S.Title level={1}>{t("forgotPasswordTitle")}</S.Title>
      <S.SubTitle>{t("forgotPasswordSubTitle")}</S.SubTitle>

      <BaseForm
        form={form}
        layout="vertical"
        onFinish={handleForgotPassword}
        initialValues={initialValues}
      >
        <BaseForm.Item
          name="email"
          label={t("emailLabel")}
          rules={validationRules.email}
          normalize={(value) => value?.trim()}
        >
          <BaseInput placeholder={t("emailPlaceholder")} size="large" />
        </BaseForm.Item>

        <BaseForm.Item>
          <BaseButton
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            {t("resetPasswordButton")}
          </BaseButton>
        </BaseForm.Item>
      </BaseForm>

      <S.FooterText>
        {t("noAccount")} <Link href="/auth/register">{t("registerNow")}</Link>
      </S.FooterText>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
