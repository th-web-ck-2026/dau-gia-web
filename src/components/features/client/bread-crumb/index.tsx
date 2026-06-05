import React from "react";

import { useTranslations } from "next-intl";

import { HomeOutlined } from "@ant-design/icons";
import type { BreadcrumbProps } from "antd";

import ChevronRightIcon from "@/assets/svg/chevron-right";
import { BaseBreadcrumb } from "@/components/common";

import * as S from "./index.styles";

export interface ClientBreadCrumbProps {
  items?: BreadcrumbProps["items"];
  separator?: React.ReactNode;
}

const ClientBreadCrumb: React.FC<ClientBreadCrumbProps> = ({
  items = [],
  separator = <ChevronRightIcon />,
}) => {
  const t = useTranslations("client.home");

  const breadcrumbItems = [
    {
      title: (
        <>
          <HomeOutlined style={{ marginRight: 8 }} />
          <span>{t("home")}</span>
        </>
      ),
      href: "/",
    },
    ...items,
  ];

  return (
    <S.BreadCrumbWrapper>
      <S.BreadCrumbInner>
        <BaseBreadcrumb items={breadcrumbItems} separator={separator} />
      </S.BreadCrumbInner>
    </S.BreadCrumbWrapper>
  );
};

export default ClientBreadCrumb;
