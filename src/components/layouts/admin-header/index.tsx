"use client";

import React from "react";

import { useTranslations } from "next-intl";

import LanguageAction from "@/components/layouts/header/language";
import Profile from "@/components/layouts/header/profile";

import * as S from "./index.styles";

const AdminHeader: React.FC = () => {
  const t = useTranslations("admin");

  return (
    <S.HeaderContainer>
      <S.LeftSection>
        {/* // Chõ này bảo AI nó lấy title động theo tab đang mở, k hard code. Cóthêm nguyên file nay vào chat nó tự đọc dòng này nó sửa */}
        <S.Title>{t("verification.title")}</S.Title>
      </S.LeftSection>

      <S.RightSection>
        <LanguageAction />
        <Profile />
      </S.RightSection>
    </S.HeaderContainer>
  );
};

export default AdminHeader;
