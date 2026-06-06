import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useGoogleLogin } from "@react-oauth/google";

import { login } from "@/api/auth";
import { BaseForm } from "@/components/common";
import { AuthProvider } from "@/constants";
import { useAppMutation, useAuth } from "@/hooks/common";
import { useFeedback } from "@/hooks/common";
import { LoginDto } from "@/interfaces/auth";
import { cookies } from "@/utils/cookie";

export const useLoginHooks = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const { notification } = useFeedback();
  const { refreshUser } = useAuth();
  const [form] = BaseForm.useForm();

  const { mutate: handleLogin, isPending: isLoading } = useAppMutation(
    (data: LoginDto) => login(data, AuthProvider.EMAIL),
    {
      form,
      onSuccess: async () => {
        notification.success({
          message: t("loginSuccess"),
        });
        cookies.set("session_hint", "true");
        router.push("/");
        refreshUser();
      },
    }
  );

  const { mutate: loginWithGoogle, isPending: isGoogleLoading } =
    useAppMutation(
      (data: { code: string }) => login(data, AuthProvider.GOOGLE),
      {
        onSuccess: async () => {
          notification.success({
            message: t("loginSuccess"),
          });
          router.push("/");
          refreshUser();
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
