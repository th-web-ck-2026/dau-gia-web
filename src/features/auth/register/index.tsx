"use client";
import React from "react";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { AuthLayout } from "../shared/AuthLayout";
import * as S from "./index.styles";
import BidwarLogo from "@/assets/svg/bidwar-text-brand.svg";
import FormRegister from "./form";
import { useRegisterHooks } from "./index.hooks";
import { useRegisterUtils } from "./index.utils";
import { BaseSegmented } from "@/components/common";
import { UserRoleType } from "@/constants";

const RegisterPage: React.FC = () => {
  const t = useTranslations("auth");
  const { form, handleRegister, isLoading } = useRegisterHooks();
  const { validationRules, initialValues, optionsSegmented, userType, setUserType } = useRegisterUtils();
  return (
    <AuthLayout reversed>
      <BidwarLogo style={{ marginBottom: "12px" }} />
      <S.Title level={1}>{t("registerTitle")}</S.Title>
      <S.SubTitle>{t("registerSubTitle")}</S.SubTitle>

      <BaseSegmented
        block
        size="large"
        value={userType}
        onChange={(value) => {
          const type = value as UserRoleType;
          setUserType(type);
          form.setFieldValue("userRoles", type);
        }}
        options={optionsSegmented}
      />

      <FormRegister
        type={userType}
        form={form}
        onFinish={handleRegister}
        validationRules={validationRules}
        initialValues={initialValues}
        isLoading={isLoading}
      />

      <S.FooterText>
        {t("alreadyHaveAccount")}{" "}
        <Link href="/auth/login">{t("loginNow")}</Link>
      </S.FooterText>
    </AuthLayout>
  );
};

export default RegisterPage;
