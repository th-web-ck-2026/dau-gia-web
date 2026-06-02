import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/routing";

const useNavigationUtils = () => {
  const t = useTranslations("header");
  const pathname = usePathname();

  const getActiveKey = (path: string): string => {
    if (path === "/" || path === "") return "/";
    if (path.startsWith("/sessions")) return "/sessions";
    if (path.startsWith("/leaderboard")) return "/leaderboard";
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
    {
      key: "/leaderboard",
      label: <Link href="/leaderboard">{t("leaderboard")}</Link>,
    },
  ];

  return {
    menuItems,
    getActiveKey,
    pathname,
  };
};

export default useNavigationUtils;
