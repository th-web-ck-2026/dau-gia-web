"use client";
import React from "react";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  BaseForm,
  BaseInput,
  BaseButton,
  InputPassword
} from "@/components/common";
import { AuthLayout } from "../shared/AuthLayout";
import { useRegisterHooks } from "./index.hooks";
import { useRegisterUtils } from "./index.utils";
import * as S from "./index.styles";

const RegisterPage: React.FC = () => {
  const t = useTranslations("auth");
  const { handleRegister, isLoading } = useRegisterHooks();
  const { validationRules } = useRegisterUtils();

  return (
    <AuthLayout reversed>
      <S.Title level={2}>{t("registerTitle")}</S.Title>
      <S.SubTitle>{t("registerSubTitle")}</S.SubTitle>

      <BaseForm layout="vertical" onFinish={handleRegister}>
        <BaseForm.Item
          name="fullname"
          label={t("fullnameLabel")}
          rules={validationRules.fullname}
        >
          <BaseInput placeholder={t("fullnamePlaceholder")} size="large" />
        </BaseForm.Item>

        <BaseForm.Item
          name="email"
          label={t("emailLabel")}
          rules={validationRules.email}
        >
          <BaseInput placeholder={t("emailPlaceholder")} size="large" />
        </BaseForm.Item>

        <BaseForm.Item
          name="phone"
          label={t("phoneLabel")}
          rules={validationRules.phone}
        >
          <BaseInput placeholder={t("phonePlaceholder")} size="large" />
        </BaseForm.Item>

        <BaseForm.Item
          name="password"
          label={t("passwordLabel")}
          rules={validationRules.password}
        >
          <InputPassword placeholder={t("passwordPlaceholder")} size="large" />
        </BaseForm.Item>

        <BaseForm.Item>
          <BaseButton
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            {t("registerButton")}
          </BaseButton>
        </BaseForm.Item>
      </BaseForm>

      <S.FooterText>
        {t("alreadyHaveAccount")}{" "}
        <Link href="/auth/login">{t("loginNow")}</Link>
      </S.FooterText>
    </AuthLayout>
  );
};

export default RegisterPage;
