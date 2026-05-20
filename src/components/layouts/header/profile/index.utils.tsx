import { useTranslations } from "next-intl";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

import { useAuth } from "@/hooks/common/useAuth";
import { Link } from "@/i18n/routing";

const useProfileUtils = () => {
  const t = useTranslations("header");
  const { user, isAuthenticated, logout } = useAuth();

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      logout();
    }
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link href="/profile">{t("profile")}</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: t("logout"),
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return {
    user,
    isAuthenticated,
    userMenuItems,
    handleUserMenuClick,
    t,
  };
};

export default useProfileUtils;
