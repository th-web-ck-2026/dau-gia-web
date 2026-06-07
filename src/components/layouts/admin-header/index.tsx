"use client";

import React from "react";

import { useTranslations } from "next-intl";

import LanguageAction from "@/components/layouts/header/language";
import Profile from "@/components/layouts/header/profile";
import { usePathname } from "@/i18n/routing";

import * as S from "./index.styles";

const AdminHeader: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations("admin");

  let headerTitle = t("verification.title");
  if (pathname.includes("/admin/thong-ke")) {
    headerTitle = t("sidebar.dashboard");
  } else if (pathname.includes("/admin/quan-ly-user")) {
    headerTitle = t("sidebar.userManagement") || "Quản lý người dùng";
  } else if (pathname.includes("/admin")) {
    headerTitle = t("verification.title");
  }

  return (
    <S.HeaderContainer>
      <S.LeftSection>
        <S.Title>{headerTitle}</S.Title>
      </S.LeftSection>

      <S.RightSection>
        <LanguageAction />
        <Profile />
      </S.RightSection>
    </S.HeaderContainer>
  );
};

export default AdminHeader;
