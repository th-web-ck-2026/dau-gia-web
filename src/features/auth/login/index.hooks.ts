import { login } from "@/api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthProvider } from "@/constants";
import { useAppMutation, useAuth } from "@/hooks/common";
import { LoginDto } from "@/interfaces/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFeedback } from "@/hooks/common";
import { cookies } from "@/utils/cookie";
import { BaseForm } from "@/components/common";
import { useEffect } from "react";

export const useLoginHooks = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const { notification } = useFeedback();
  const { refreshUser, isAuthenticated, isInitializing } = useAuth();
  const [form] = BaseForm.useForm();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitializing, router]);

  const { mutate: handleLogin, isPending: isLoading } = useAppMutation(
    (data: LoginDto) => login(data, AuthProvider.EMAIL),
    {
      form,
      onSuccess: async () => {
        notification.success({
          message: t("loginSuccess"),
        });
        cookies.set("session_hint", "true");
        await refreshUser();
        router.push("/");
      },
    }
  );

  const { mutate: loginWithGoogle, isPending: isGoogleLoading } = useAppMutation(
    (data: { code: string }) => login(data, AuthProvider.GOOGLE),
    {
      onSuccess: async () => {
        notification.success({
          message: t("loginSuccess"),
        });
        await refreshUser();
        router.push("/");
      },
    }
  );

  const handleGoogleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (response) => {
      if (response.code) {
        loginWithGoogle({ code: response.code });
      }
    },
    onError: () => {
      notification.error({
        message: t("loginError"),
      });
    },
  });

  return {
    form,
    handleLogin,
    handleGoogleLogin,
    isLoading: isLoading || isGoogleLoading,
  };
};
