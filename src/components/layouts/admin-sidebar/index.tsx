"use client";

import React from "react";

import { useTranslations } from "next-intl";

import {
  ArrowLeftOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

import { BaseMenu } from "@/components/common";
import { Link, usePathname } from "@/i18n/routing";

import * as S from "./index.styles";

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations("admin");

  const selectedKey = pathname.includes("/admin") ? "verification" : "";

  const menuItems = [
    {
      key: "verification",
      icon: <SafetyCertificateOutlined style={{ fontSize: "18px" }} />,
      label: <Link href="/admin">{t("sidebar.userVerification")}</Link>,
    },
  ];

  const footerMenuItems = [
    {
      key: "back-home",
      icon: <ArrowLeftOutlined style={{ fontSize: "16px" }} />,
      label: (
        <Link href="/">
          {t("verification.modal.cancel") || "Quay lại trang chủ"}
        </Link>
      ),
    },
  ];

  return (
    <S.StyledSider width={260} theme="dark">
      <S.SidebarHeader>
        {/* // Chỗ này sửa thành để logo như bên homepage ấy, bảo AI làm cho */}
        <S.LogoText>ĐẤU GIÁ ĐẠI VIỆT</S.LogoText>
      </S.SidebarHeader>

      <S.MenuWrapper>
        <BaseMenu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </S.MenuWrapper>

      <S.SidebarFooter>
        <BaseMenu mode="inline" selectable={false} items={footerMenuItems} />
      </S.SidebarFooter>
    </S.StyledSider>
  );
};

export default AdminSidebar;
