"use client";

import React, { useState } from "react";

import { IdcardOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

import { BaseSpin } from "@/components/common";
import ClientBreadCrumb from "@/components/features/client/bread-crumb";
import { UserRoleType } from "@/constants";
import { useAuth } from "@/hooks/common";

import IndividualAccountForm from "./components/IndividualAccountForm";
import IndividualIdentityForm from "./components/IndividualIdentityForm";
import OrganizationAccountForm from "./components/OrganizationAccountForm";
import * as S from "./index.styles";
import useClientProfile from "./index.utils";
import ChangePasswordForm from "./shared/ChangePasswordForm";
import ProfileLayout from "./shared/ProfileLayout";

const ClientProfile = () => {
  const { items, t } = useClientProfile();
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("info");

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <BaseSpin size="large" />
      </div>
    );
  }

  if (!user) {
    return null; // Let AuthProvider/Middleware handle redirects
  }

  // Dynamic header configurations
  const getHeaderConfig = () => {
    switch (activeTab) {
      case "password":
        return {
          icon: <LockOutlined />,
          title: t("changePassword"),
          subtitle: "Cập nhật mật khẩu tài khoản của bạn",
        };
      case "verify":
        return {
          icon: <IdcardOutlined />,
          title: t("verifyIdentity"),
          subtitle: "Cập nhật thông tin tài khoản của bạn",
        };
      case "info":
      default:
        return {
          icon: <UserOutlined />,
          title: t("infomationAccount"),
          subtitle: "Cập nhật thông tin tài khoản của bạn",
        };
    }
  };

  const isIndividual = user.userRoles === UserRoleType.CA_NHAN;

  return (
    <S.ProfileContainer>
      <ClientBreadCrumb items={items} />

      <div style={{ height: 24 }} />

      <ProfileLayout
        user={user}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={logout}
        contentHeader={getHeaderConfig()}
      >
        {activeTab === "info" && isIndividual && (
          <IndividualAccountForm user={user} />
        )}
        {activeTab === "info" && !isIndividual && (
          <OrganizationAccountForm user={user} />
        )}
        {activeTab === "password" && <ChangePasswordForm />}
        {activeTab === "verify" && isIndividual && <IndividualIdentityForm />}
      </ProfileLayout>
    </S.ProfileContainer>
  );
};

export default ClientProfile;
