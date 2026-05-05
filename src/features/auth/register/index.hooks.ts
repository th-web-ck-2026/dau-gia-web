import { register } from "@/api/auth";
import { BaseForm } from "@/components/common";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFeedback, useAuth, useAppMutation } from "@/hooks/common";
import { useEffect } from "react";

export const useRegisterHooks = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const { notification } = useFeedback();
  const { isAuthenticated, isInitializing } = useAuth();
  const [form] = BaseForm.useForm();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitializing, router]);

  const { mutate: handleRegister, isPending: isLoading } = useAppMutation(register, {
    form,
    onSuccess: () => {
      notification.success({
        message: t("registerSuccess"),
      });
      router.push("/auth/login");
    },
  });

  return {
    form,
    handleRegister,
    isLoading,
  };
};
