import React from "react";
import { useTranslations } from "next-intl";
import {
  BaseForm,
  BaseInput,
  InputPassword,
  BaseRow,
  BaseCol,
} from "@/components/common";
import { Rule } from "antd/es/form";
import { UserRoleType } from "@/constants";

interface CommonFieldsProps {
  validationRules: Record<string, Rule[]>;
  type: UserRoleType;
}

export const CommonFields: React.FC<CommonFieldsProps> = ({ validationRules, type }) => {
  const t = useTranslations("auth");

  return (
    <>
      <BaseRow gutter={16}>
        <BaseCol xs={24} md={12}>
          <BaseForm.Item
            name="fullname"
            label={t("fullnameLabel")}
            rules={validationRules.fullname}
          >
            <BaseInput placeholder={t("inputInfoPlaceholder")} size="large" />
          </BaseForm.Item>
        </BaseCol>
        <BaseCol xs={24} md={12}>
          <BaseForm.Item
            name="email"
            label={t("emailLabel")}
            rules={validationRules.email}
          >
            <BaseInput placeholder={t("inputInfoPlaceholder")} size="large" />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>

      <BaseRow gutter={16}>
        <BaseCol xs={24} md={12}>
          <BaseForm.Item
            name="phone"
            label={t("phoneLabel")}
            rules={validationRules.phone}
          >
            <BaseInput placeholder={t("inputInfoPlaceholder")} size="large" />
          </BaseForm.Item>
        </BaseCol>
        <BaseCol xs={24} md={12}>
          {type === UserRoleType.CA_NHAN ? (
            <BaseForm.Item
              name="soCccd"
              label={t("soCccdLabel")}
              rules={validationRules.soCccd}
            >
              <BaseInput placeholder={t("soCccdPlaceholder")} size="large" />
            </BaseForm.Item>
          ) : (
            <BaseForm.Item
              name="soCccd" // Later change to taxCode
              label={t("soCccdLabel2")}
              rules={validationRules.soCccd}
            >
              <BaseInput placeholder={t("soCccdPlaceholder")} size="large" />
            </BaseForm.Item>
          )}
        </BaseCol>
      </BaseRow>

      <BaseRow gutter={16}>
        <BaseCol xs={24} md={12}>
          <BaseForm.Item
            name="password"
            label={t("passwordLabel")}
            rules={validationRules.password}
          >
            <InputPassword placeholder="***********" size="large" />
          </BaseForm.Item>
        </BaseCol>
        <BaseCol xs={24} md={12}>
          <BaseForm.Item
            name="confirmPassword"
            label={t("confirmPasswordLabel")}
            rules={validationRules.confirmPassword}
          >
            <InputPassword placeholder="***********" size="large" />
          </BaseForm.Item>
        </BaseCol>
      </BaseRow>
    </>
  );
};
