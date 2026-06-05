"use client";
import React from "react";

import { useTranslations } from "next-intl";

import BidwarLogo from "@/assets/svg/bidwar-text-brand.svg";
import { BaseSegmented } from "@/components/common";
import { UserRoleType } from "@/constants";
import { Link } from "@/i18n/routing";

import { AuthLayout } from "../shared/AuthLayout";
import FormRegister from "./form";
import { useRegisterHooks } from "./index.hooks";
import * as S from "./index.styles";
import { useRegisterUtils } from "./index.utils";

const RegisterPage: React.FC = () => {
  const t = useTranslations("auth");
  const { form, handleRegister, isLoading } = useRegisterHooks();
  const {
    validationRules,
    initialValues,
    optionsSegmented,
    userType,
    setUserType,
  } = useRegisterUtils();
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
        onFinish={(values) =>
          handleRegister({ ...values, userRoles: userType })
        }
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
