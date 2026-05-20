"use client";

import { useTranslations } from "next-intl";

import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

import { BaseAvatar, BaseDivider, BaseDropdown } from "@/components/common";
import { useAuth } from "@/hooks/common/useAuth";
import { Link } from "@/i18n/routing";
import { getFirstLetterOfLastName } from "@/utils/common";

import * as S from "./index.styles";

export const Profile = () => {
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

  if (!isAuthenticated) {
    return (
      <S.ButtonsWrapper>
        <Link href="/auth/login">
          <S.Button type="primary">{t("login")}</S.Button>
        </Link>
        <Link href="/auth/register">
          <S.Button variant="outlined">{t("register")}</S.Button>
        </Link>
      </S.ButtonsWrapper>
    );
  }

  return (
    <S.ProfileWrapper>
      <BaseDropdown
        menu={{
          items: userMenuItems,
          onClick: handleUserMenuClick,
        }}
        trigger={["hover"]}
        placement="bottomRight"
        dropdownRender={(menu) => (
          <S.DropdownWrapper>
            <div className="drop-top">
              {user?.avatar ? (
                <BaseAvatar src={user?.avatar} size={42}></BaseAvatar>
              ) : (
                <BaseAvatar size={42}>
                  {getFirstLetterOfLastName(user?.fullname)}
                </BaseAvatar>
              )}
              <div className="info">
                <span className="name">{user?.fullname}</span>
                <span className="email">{user?.email}</span>
              </div>
            </div>
            <BaseDivider size="small"></BaseDivider>
            {menu}
          </S.DropdownWrapper>
        )}
      >
        <S.UserTrigger>
          <span>{user?.fullname}</span>
          <DownOutlined style={{ fontSize: "10px" }} />
        </S.UserTrigger>
      </BaseDropdown>
    </S.ProfileWrapper>
  );
};

export default Profile;
