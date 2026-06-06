"use client";

import React, { useEffect, useState } from "react";

import { IdcardOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

import { BaseSpin } from "@/components/common";
import ClientBreadCrumb from "@/components/features/client/bread-crumb";
import { UserRoleType } from "@/constants";
import { useAuth } from "@/hooks/common";
import { useRouter } from "@/i18n/routing";

import IndividualAccountForm from "./components/IndividualAccountForm";
import IndividualIdentityForm from "./components/IndividualIdentityForm";
import OrganizationAccountForm from "./components/OrganizationAccountForm";
import * as S from "./index.styles";
import useClientProfile from "./index.utils";
import ChangePasswordForm from "./shared/ChangePasswordForm";
import ProfileLayout from "./shared/ProfileLayout";

const ClientProfile = () => {
  const router = useRouter();
  const {
    items,
    t,
    updateIndividual,
    updateOrganization,
    handleAvatarUpload,
    isUploadingAvatar,
  } = useClientProfile();
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [isLoading, user, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

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
    return null;
  }

  const getHeaderConfig = () => {
    switch (activeTab) {
      case "password":
        return {
          icon: <LockOutlined />,
          title: t("changePassword"),
          subtitle: t("changePasswordSubtitle"),
        };
      case "verify":
        return {
          icon: <IdcardOutlined />,
          title: t("verifyIdentity"),
          subtitle: t("verifyIdentitySubtitle"),
        };
      case "info":
      default:
        return {
          icon: <UserOutlined />,
          title: t("infomationAccount"),
          subtitle: t("informationAccountSubtitle"),
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
        onLogout={handleLogout}
        onAvatarUpload={handleAvatarUpload}
        isUploadingAvatar={isUploadingAvatar}
        contentHeader={getHeaderConfig()}
      >
        {activeTab === "info" && isIndividual && (
          <IndividualAccountForm user={user} onSave={updateIndividual} />
        )}
        {activeTab === "info" && !isIndividual && (
          <OrganizationAccountForm user={user} onSave={updateOrganization} />
        )}
        {activeTab === "password" && <ChangePasswordForm />}
        {activeTab === "verify" && isIndividual && <IndividualIdentityForm />}
      </ProfileLayout>
    </S.ProfileContainer>
  );
};

export default ClientProfile;
