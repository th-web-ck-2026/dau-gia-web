import React from "react";

import { Breadcrumb, BreadcrumbProps } from "antd";

import * as S from "./index.styles";

export type BaseBreadcrumbProps = BreadcrumbProps;

interface BaseBreadcrumbInterface extends React.FC<BaseBreadcrumbProps> {
  Item: typeof Breadcrumb.Item;
  Separator: typeof Breadcrumb.Separator;
}

export const BaseBreadcrumb: BaseBreadcrumbInterface = ({
  children,
  ...props
}) => {
  return <S.Breadcrumb {...props}>{children}</S.Breadcrumb>;
};

BaseBreadcrumb.Item = Breadcrumb.Item;
BaseBreadcrumb.Separator = Breadcrumb.Separator;
