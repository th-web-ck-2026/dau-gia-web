import { useTranslations } from "next-intl";

import { useAuth } from "@/hooks/common";
import { Link, usePathname } from "@/i18n/routing";

const useNavigationUtils = () => {
  const t = useTranslations("header");
  const pathname = usePathname();
  const { user } = useAuth();

  const getActiveKey = (path: string): string => {
    if (path === "/" || path === "") return "/";
    if (path.startsWith("/sessions")) return "/sessions";
    if (path.startsWith("/my-sessions")) return "/my-sessions";
    return "";
  };

  const menuItems = [
    {
      key: "/",
      label: <Link href="/">{t("home")}</Link>,
    },
    {
      key: "/sessions",
      label: <Link href="/sessions">{t("sessions")}</Link>,
    },
    ...(user?.isVerified
      ? [
          {
            key: "/my-sessions",
            label: <Link href="/my-sessions">{t("mySessions")}</Link>,
          },
        ]
      : []),
  ];

  return {
    menuItems,
    getActiveKey,
    pathname,
  };
};

export default useNavigationUtils;
