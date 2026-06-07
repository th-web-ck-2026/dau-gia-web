import { useTranslations } from "next-intl";

import { Rule } from "antd/es/form";

import { PASSWORD_PATTERN } from "@/constants";

export const useResetPasswordUtils = () => {
  const t = useTranslations("auth");
  const tv = useTranslations("validation");

  const validationRules: Record<string, Rule[]> = {
    newPassword: [
      {
        required: true,
        message: tv("required", { field: t("passwordLabel") }),
      },
      { pattern: PASSWORD_PATTERN, message: tv("passwordInvalid") },
    ],
    confirmPassword: [
      {
        required: true,
        message: tv("required", { field: t("confirmPasswordLabel") }),
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("newPassword") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error(tv("passwordMismatch")));
        },
      }),
    ],
  };

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  return {
    validationRules,
    initialValues,
  };
};
