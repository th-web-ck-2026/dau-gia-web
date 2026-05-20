import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/routing";

const useNavigationUtils = () => {
  const t = useTranslations("header");
  const pathname = usePathname();

  const getActiveKey = (path: string): string => {
    if (path === "/" || path === "") return "/";
    if (path.startsWith("/auctions")) return "/auctions";
    if (path.startsWith("/news")) return "/news";
    if (path.startsWith("/notices")) return "/notices";
    if (path.startsWith("/contact")) return "/contact";
    if (path.startsWith("/about")) return "/about";
    return "";
  };

  const menuItems = [
    {
      key: "/",
      label: <Link href="/">{t("home")}</Link>,
    },
    {
      key: "/auctions",
      label: <Link href="/auctions">{t("auctionAssets")}</Link>,
    },
    {
      key: "/news",
      label: <Link href="/news">{t("news")}</Link>,
    },
    {
      key: "/notices",
      label: <Link href="/notices">{t("auctionNotices")}</Link>,
    },
    {
      key: "/contact",
      label: <Link href="/contact">{t("contact")}</Link>,
    },
  ];

  return {
    menuItems,
    getActiveKey,
    pathname,
  };
};

export default useNavigationUtils;
