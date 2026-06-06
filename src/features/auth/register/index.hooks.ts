import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { register } from "@/api/auth";
import { BaseForm } from "@/components/common";
import { useAppMutation, useFeedback } from "@/hooks/common";

export const useRegisterHooks = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const { notification } = useFeedback();
  const [form] = BaseForm.useForm();

  const { mutate, isPending: isLoading } = useAppMutation(register, {
    form,
    onSuccess: () => {
      notification.success({
        message: t("registerSuccess"),
      });
      router.push("/auth/login");
    },
  });

  const handleRegister = (values: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, agreement, ...submitData } = values;
    mutate(submitData);
  };

  return {
    form,
    handleRegister,
    isLoading,
  };
};
