import { useTranslations } from "next-intl";
import { Rule } from "antd/es/form";

export const useRegisterUtils = () => {
  const t = useTranslations("auth");
  const tv = useTranslations("validation");

  const validationRules: Record<string, Rule[]> = {
    email: [
      { required: true, message: tv("required", { field: t("emailLabel") }) },
      { type: "email", message: tv("emailInvalid") },
    ],
    password: [
      { required: true, message: tv("required", { field: t("passwordLabel") }) },
      { min: 6, message: tv("passwordMinLength", { min: 6 }) },
    ],
    fullname: [
      { required: true, message: tv("required", { field: t("fullnameLabel") }) },
    ],
    phone: [
      { required: true, message: tv("required", { field: t("phoneLabel") }) },
      { pattern: /^[0-9]{10}$/, message: tv("phoneInvalid") },
    ],
  };


  return {
    validationRules,
  };
};
