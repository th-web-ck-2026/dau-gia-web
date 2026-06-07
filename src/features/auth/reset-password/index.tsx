"use client";
import React from "react";

import { useTranslations } from "next-intl";

import BidwarLogo from "@/assets/svg/bidwar-text-brand.svg";
import { BaseButton, BaseForm, InputPassword } from "@/components/common";

import { AuthLayout } from "../shared/AuthLayout";
import { useResetPasswordHooks } from "./index.hooks";
import * as S from "./index.styles";
import { useResetPasswordUtils } from "./index.utils";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ token }) => {
  const t = useTranslations("auth");
  const { form, onSubmit, isLoading } = useResetPasswordHooks(token);
  const { validationRules, initialValues } = useResetPasswordUtils();

  return (
    <AuthLayout backUrl="/auth/login">
      <BidwarLogo style={{ marginBottom: "12px" }} />
      <S.Title level={1}>{t("resetPasswordPageTitle")}</S.Title>
      <S.SubTitle>{t("resetPasswordPageSubTitle")}</S.SubTitle>

      <BaseForm
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <BaseForm.Item
          name="newPassword"
          label={t("passwordLabel")}
          rules={validationRules.newPassword}
        >
          <InputPassword
            placeholder={t("newPasswordPlaceholder")}
            size="large"
          />
        </BaseForm.Item>

        <BaseForm.Item
          name="confirmPassword"
          label={t("confirmPasswordLabel")}
          rules={validationRules.confirmPassword}
        >
          <InputPassword
            placeholder={t("confirmNewPasswordPlaceholder")}
            size="large"
          />
        </BaseForm.Item>

        <BaseForm.Item style={{ marginTop: "24px" }}>
          <BaseButton
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            {t("submitResetPasswordButton")}
          </BaseButton>
        </BaseForm.Item>
      </BaseForm>
    </AuthLayout>
  );
};

export default ResetPassword;
