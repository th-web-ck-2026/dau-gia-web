import { useTranslations } from "next-intl";

import { forgotPassword } from "@/api/auth";
import { BaseForm } from "@/components/common";
import { useAppMutation, useFeedback } from "@/hooks/common";
import { ForgotPasswordDto } from "@/interfaces/auth";

export const useForgotPasswordHooks = () => {
  const t = useTranslations("auth");
  const { notification } = useFeedback();
  const [form] = BaseForm.useForm();

  const { mutate: handleForgotPassword, isPending: isLoading } = useAppMutation(
    (data: ForgotPasswordDto) => forgotPassword(data),
    {
      form,
      onSuccess: async () => {
        notification.success({
          message: t("forgotPasswordSuccess"),
        });
        form.resetFields();
      },
    }
  );

  return {
    form,
    handleForgotPassword,
    isLoading,
  };
};
