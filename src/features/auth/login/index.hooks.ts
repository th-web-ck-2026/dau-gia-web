import { login } from "@/api/auth";
import { AuthProvider } from "@/constants";
import { useAppMutation, useAuth } from "@/hooks/common";
import { LoginDto } from "@/interfaces/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useFeedback } from "@/hooks/common";
import { cookies } from "@/utils/cookie";
import { useEffect } from "react";

export const useLoginHooks = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const { notification } = useFeedback();
  const { refreshUser, isAuthenticated, isInitializing } = useAuth();

  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitializing, router]);

  const loginMutation = useAppMutation(
    (data: LoginDto) => login(data, AuthProvider.EMAIL),
    {
      queryOptions: {
        onSuccess: async () => {
          notification.success({
            message: t("loginSuccess"),
          });
          
          // Set session hint to true
          cookies.set("session_hint", "true");
          
          // Refresh user info into Redux store
          await refreshUser();
          
          router.push("/");
        },
      },
    }
  );



  const handleLogin = (values: LoginDto) => {
    loginMutation.mutate(values);
  };

  return {
    handleLogin,
    isLoading: loginMutation.isPending,
  };
};
