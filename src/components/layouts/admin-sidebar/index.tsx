"use client";

import React from "react";

import { useTranslations } from "next-intl";

import {
  ArrowLeftOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import BrandLogo from "@/assets/svg/bidwar-text-brand.svg";
import { BaseMenu } from "@/components/common";
import { Link, usePathname } from "@/i18n/routing";

import * as S from "./index.styles";

const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations("admin");

  let selectedKey = "";
  if (pathname.includes("/admin/thong-ke")) {
    selectedKey = "stats";
  } else if (pathname.includes("/admin/quan-ly-user")) {
    selectedKey = "users";
  } else if (pathname.includes("/admin/bao-cao-user")) {
    selectedKey = "reports";
  } else if (pathname.includes("/admin")) {
    selectedKey = "verification";
  }

  const menuItems = [
    {
      key: "stats",
      icon: <BarChartOutlined style={{ fontSize: "18px" }} />,
      label: <Link href="/admin/thong-ke">Thống kê hệ thống</Link>,
    },
    {
      key: "verification",
      icon: <SafetyCertificateOutlined style={{ fontSize: "18px" }} />,
      label: (
        <Link href="/admin">
          {t("sidebar.userVerification") || "Xác minh người dùng"}
        </Link>
      ),
    },
    {
      key: "users",
      icon: <TeamOutlined style={{ fontSize: "18px" }} />,
      label: (
        <Link href="/admin/quan-ly-user">{t("sidebar.userManagement")}</Link>
      ),
    },
    {
      key: "reports",
      icon: <WarningOutlined style={{ fontSize: "18px" }} />,
      label: <Link href="/admin/bao-cao-user">{t("sidebar.userReports")}</Link>,
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
        <S.LogoWrapper>
          <BrandLogo />
        </S.LogoWrapper>
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
