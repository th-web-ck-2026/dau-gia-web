import { useTranslations } from "next-intl";
import { Rule } from "antd/es/form";
import { PASSWORD_PATTERN, PHONE_NUMBER_VI_PATTERN, IDENTITY_CARD_NO_PATTERN, UserRoleType } from "@/constants";
import type { BaseSegmentedProps } from "@/components/common";
import { BankOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";

export const useRegisterUtils = () => {
  const t = useTranslations("auth");
  const tv = useTranslations("validation");
  const [userType, setUserType] = useState<UserRoleType>(UserRoleType.CA_NHAN);

  const commonRules: Record<string, Rule[]> = {
    email: [
      { required: true, message: tv("required", { field: t("emailLabel") }) },
      { type: "email", message: tv("emailInvalid") },
    ],
    password: [
      { required: true, message: tv("required", { field: t("passwordLabel") }) },
      { pattern: PASSWORD_PATTERN, message: tv("passwordInvalid") },
    ],
    fullname: [
      { required: true, message: tv("required", { field: t("fullnameLabel") }) },
    ],
    phone: [
      { required: true, message: tv("required", { field: t("phoneLabel") }) },
      { pattern: PHONE_NUMBER_VI_PATTERN, message: tv("phoneInvalid") },
    ],
    confirmPassword: [
      { required: true, message: tv("required", { field: t("confirmPasswordLabel") }) },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(tv("passwordMismatch")));
        },
      }),
    ],
    agreement: [
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error(tv("agreementRequired"))),
      },
    ],
  };

  const validationRules: Record<UserRoleType, Record<string, Rule[]>> = {
    [UserRoleType.CA_NHAN]: {
      ...commonRules,
      soCccd: [
        { required: true, message: tv("required", { field: t("soCccdLabel") }) },
        { pattern: IDENTITY_CARD_NO_PATTERN, message: tv("identityCardNoInvalid") },
      ],
    },
    [UserRoleType.TO_CHUC]: {
      ...commonRules,
      soCccd: [
        { required: true, message: tv("required", { field: t("soCccdLabel") }) },
        { pattern: IDENTITY_CARD_NO_PATTERN, message: tv("identityCardNoInvalid") },
      ],
    },
  };

  const commonInitialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    phone: "",
    agreement: false,
  };

  const initialValues: Record<UserRoleType, any> = {
    [UserRoleType.CA_NHAN]: {
      ...commonInitialValues,
      soCccd: "",
      userRoles: UserRoleType.CA_NHAN,
    },
    [UserRoleType.TO_CHUC]: {
      ...commonInitialValues,
      soCccd: "",
      userRoles: UserRoleType.TO_CHUC,
    },
  };

  const optionsSegmented: BaseSegmentedProps["options"] = [
    {
      label: t("individual"),
      value: UserRoleType.CA_NHAN,
      icon: <UserOutlined />,
    },
    {
      label: t("organization"),
      value: UserRoleType.TO_CHUC,
      icon: <BankOutlined />,
    },
  ]

  return {
    validationRules: validationRules[userType],
    initialValues: initialValues[userType],
    optionsSegmented,
    userType,
    setUserType,
  };
};
