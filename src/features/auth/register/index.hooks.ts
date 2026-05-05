import { register } from "@/api/auth";
import { useAppMutation } from "@/hooks/common";
import { RegisterDto } from "@/interfaces/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFeedback, useAuth } from "@/hooks/common";
import { useEffect } from "react";

export const useRegisterHooks = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const { notification } = useFeedback();
  const { isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitializing, router]);

  const { mutate: handleRegister, isPending: isLoading } = useAppMutation(register, {
    onSuccess: () => {
      notification.success({
        message: t("registerSuccess"),
      });
      router.push("/auth/login");
    },
  });

  return {
    handleRegister,
    isLoading,
  };
};
