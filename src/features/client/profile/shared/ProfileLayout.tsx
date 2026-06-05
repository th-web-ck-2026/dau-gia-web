import React from "react";

import { useTranslations } from "next-intl";

import {
  CameraOutlined,
  IdcardOutlined,
  LoadingOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UploadProps } from "antd";

import { BaseAvatar, BaseCol, BaseRow, BaseUpload } from "@/components/common";
import { AuthProvider, UserRoleType } from "@/constants";
import type { User } from "@/interfaces/auth";

import * as S from "../index.styles";

export interface MenuItemConfig {
  key: string;
  label: string;
  icon: React.ReactNode;
}

export interface ProfileLayoutProps {
  user: User;
  activeTab: string;
  onTabChange: (key: string) => void;
  onLogout: () => void;
  onAvatarUpload?: (
    options: Parameters<Required<UploadProps>["customRequest"]>[0]
  ) => void;
  isUploadingAvatar?: boolean;
  contentHeader: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
  };
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({
  user,
  activeTab,
  onTabChange,
  onLogout,
  onAvatarUpload,
  isUploadingAvatar = false,
  contentHeader,
  children,
}) => {
  const t = useTranslations("client.profile");

  const isIndividual = user.userRoles === UserRoleType.CA_NHAN;

  const menuItems: MenuItemConfig[] = [
    {
      key: "info",
      label: t("infomationAccount"),
      icon: <UserOutlined />,
    },
    ...(user.authProvider !== AuthProvider.GOOGLE
      ? [
          {
            key: "password",
            label: t("changePassword"),
            icon: <LockOutlined />,
          },
        ]
      : []),
    ...(isIndividual
      ? [
          {
            key: "verify",
            label: t("verifyIdentity"),
            icon: <IdcardOutlined />,
          },
        ]
      : []),
    {
      key: "logout",
      label: t("logout"),
      icon: <LogoutOutlined />,
    },
  ];

  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      onLogout();
    } else {
      onTabChange(key);
    }
  };

  return (
    <BaseRow gutter={[24, 24]}>
      {/* Sidebar Col */}
      <BaseCol xs={24} lg={7} xl={6}>
        <S.SidebarCard>
          {/* Avatar Section */}
          <S.AvatarSection>
            <BaseUpload
              name="avatar"
              showUploadList={false}
              customRequest={onAvatarUpload}
              disabled={isUploadingAvatar}
            >
              <S.AvatarWrapper>
                {isUploadingAvatar ? (
                  <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} />
                ) : user.avatar ? (
                  <BaseAvatar
                    src={user.avatar}
                    size={110}
                    icon={<UserOutlined />}
                  />
                ) : (
                  <UserOutlined />
                )}
                <S.AvatarEditBtn>
                  <CameraOutlined />
                </S.AvatarEditBtn>
              </S.AvatarWrapper>
            </BaseUpload>
            <S.Greetings>{t("hello")}</S.Greetings>
            <S.UserName>{user.fullname || "User"}</S.UserName>
            <S.RoleBadge>
              {isIndividual ? t("individualAccount") : t("organizationAccount")}
            </S.RoleBadge>
          </S.AvatarSection>

          <S.ContentDivider style={{ margin: "10px 0" }} />

          {/* User Info Details list */}
          <S.InfoList>
            {isIndividual && (
              <S.InfoItem>
                <S.InfoLabel>{t("accountType")}</S.InfoLabel>
                <S.InfoValue>{t("customer")}</S.InfoValue>
              </S.InfoItem>
            )}
            <S.InfoItem>
              <S.InfoLabel>{t("phone")}</S.InfoLabel>
              <S.InfoValue>{user.phone || "---"}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>{t("email")}</S.InfoLabel>
              <S.InfoValue>{user.email || "---"}</S.InfoValue>
            </S.InfoItem>
          </S.InfoList>

          <S.ContentDivider style={{ margin: "10px 0" }} />

          {/* Sidebar Menu */}
          <S.SidebarMenu>
            {menuItems.map((item) => (
              <S.MenuItem
                key={item.key}
                $active={activeTab === item.key}
                onClick={() => handleMenuClick(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </S.MenuItem>
            ))}
          </S.SidebarMenu>
        </S.SidebarCard>
      </BaseCol>

      {/* Main Content Col */}
      <BaseCol xs={24} lg={17} xl={18}>
        <S.ContentCard>
          <S.ContentHeader>
            <S.HeaderIconBox>{contentHeader.icon}</S.HeaderIconBox>
            <S.HeaderTitles>
              <S.HeaderTitle>{contentHeader.title}</S.HeaderTitle>
              <S.HeaderSubtitle>{contentHeader.subtitle}</S.HeaderSubtitle>
            </S.HeaderTitles>
          </S.ContentHeader>

          <S.ContentDivider />

          {children}
        </S.ContentCard>
      </BaseCol>
    </BaseRow>
  );
};

export default ProfileLayout;
