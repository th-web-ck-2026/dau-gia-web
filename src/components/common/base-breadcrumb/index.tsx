import React from "react";

import { Breadcrumb, BreadcrumbProps } from "antd";

import { Link } from "@/i18n/routing";

import * as S from "./index.styles";

export type BaseBreadcrumbProps = BreadcrumbProps;

interface BaseBreadcrumbInterface extends React.FC<BaseBreadcrumbProps> {
  Item: typeof Breadcrumb.Item;
  Separator: typeof Breadcrumb.Separator;
}

export const BaseBreadcrumb: BaseBreadcrumbInterface = ({
  children,
  itemRender,
  ...props
}) => {
  const defaultItemRender: NonNullable<BreadcrumbProps["itemRender"]> = (
    item,
    _,
    items
  ) => {
    const isLast = items.indexOf(item) === items.length - 1;

    return isLast || !item.href ? (
      <span>{item.title}</span>
    ) : (
      <Link href={item.href}>{item.title}</Link>
    );
  };

  return (
    <S.Breadcrumb itemRender={itemRender || defaultItemRender} {...props}>
      {children}
    </S.Breadcrumb>
  );
};

BaseBreadcrumb.Item = Breadcrumb.Item;
BaseBreadcrumb.Separator = Breadcrumb.Separator;
