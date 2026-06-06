import { useTranslations } from "next-intl";

import { Rule } from "antd/es/form";

import { ForgotPasswordDto } from "@/interfaces/auth";

export const useForgotPasswordUtils = () => {
  const t = useTranslations("auth");
  const tv = useTranslations("validation");

  const validationRules: Record<string, Rule[]> = {
    email: [
      { required: true, message: tv("required", { field: t("emailLabel") }) },
      { type: "email", message: tv("emailInvalid") },
    ],
  };

  const initialValues: ForgotPasswordDto = {
    email: "",
  };

  return {
    validationRules,
    initialValues,
  };
};
