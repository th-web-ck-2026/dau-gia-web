import { useState } from "react";

import { useTranslations } from "next-intl";

import { BankOutlined, UserOutlined } from "@ant-design/icons";
import { Rule } from "antd/es/form";

import type { BaseSegmentedProps } from "@/components/common";
import {
  IDENTITY_CARD_NO_PATTERN,
  PASSWORD_PATTERN,
  PHONE_NUMBER_VI_PATTERN,
  UserRoleType,
} from "@/constants";

export const useRegisterUtils = () => {
  const t = useTranslations("auth");
  const tv = useTranslations("validation");
  const [userType, setUserType] = useState<UserRoleType>(UserRoleType.CA_NHAN);

  const getCommonRules = (fullnameField: string): Record<string, Rule[]> => ({
    email: [
      { required: true, message: tv("required", { field: t("emailLabel") }) },
      { type: "email", message: tv("emailInvalid") },
    ],
    password: [
      {
        required: true,
        message: tv("required", { field: t("passwordLabel") }),
      },
      { pattern: PASSWORD_PATTERN, message: tv("passwordInvalid") },
    ],
    fullname: [
      { required: true, message: tv("required", { field: fullnameField }) },
    ],
    phone: [
      { required: true, message: tv("required", { field: t("phoneLabel") }) },
      { pattern: PHONE_NUMBER_VI_PATTERN, message: tv("phoneInvalid") },
    ],
    confirmPassword: [
      {
        required: true,
        message: tv("required", { field: t("confirmPasswordLabel") }),
      },
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
  });

  const validationRules: Record<UserRoleType, Record<string, Rule[]>> = {
    [UserRoleType.CA_NHAN]: {
      ...getCommonRules(t("fullnameLabel")),
      soCccd: [
        {
          required: true,
          message: tv("required", { field: t("soCccdLabel") }),
        },
        {
          pattern: IDENTITY_CARD_NO_PATTERN,
          message: tv("identityCardNoInvalid"),
        },
      ],
    },
    [UserRoleType.TO_CHUC]: {
      ...getCommonRules(t("fullnameLabel2")),
      soCccd: [
        {
          required: true,
          message: tv("required", { field: t("soCccdLabel2") }),
        },
        { pattern: IDENTITY_CARD_NO_PATTERN, message: tv("orgRegNoInvalid") },
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
  ];

  return {
    validationRules: validationRules[userType],
    initialValues: initialValues[userType],
    optionsSegmented,
    userType,
    setUserType,
  };
};
