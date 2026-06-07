import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { resetPassword } from "@/api/auth";
import { BaseForm } from "@/components/common";
import { useAppMutation, useFeedback } from "@/hooks/common";
import { ResetPasswordDto } from "@/interfaces/auth";

export const useResetPasswordHooks = (token: string) => {
  const router = useRouter();
  const t = useTranslations("auth");
  const { notification } = useFeedback();
  const [form] = BaseForm.useForm();

  const { mutate: handleResetPassword, isPending: isLoading } = useAppMutation(
    (data: ResetPasswordDto) => resetPassword(data),
    {
      form,
      onSuccess: async () => {
        notification.success({
          message: t("resetPasswordSuccess"),
        });
        form.resetFields();
        router.push("/auth/login");
      },
    }
  );

  const onSubmit = (
    values: Omit<ResetPasswordDto, "token"> & { confirmPassword?: string }
  ) => {
    handleResetPassword({
      token,
      newPassword: values.newPassword,
    });
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
};
