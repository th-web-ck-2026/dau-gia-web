import { useTranslations } from "next-intl";
import { Rule } from "antd/es/form";
import { LoginDto } from "@/interfaces/auth";

export const useLoginUtils = () => {
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
  };

  const initialValues: LoginDto = {
    email: "",
    password: "",
  };


  return {
    validationRules,
    initialValues,
  };
};
