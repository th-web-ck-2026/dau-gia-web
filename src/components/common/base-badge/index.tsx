import React from "react";

import { Badge, BadgeProps } from "antd";

import * as S from "./index.styles";

export type BaseBadgeProps = BadgeProps;

interface BaseBadgeInterface extends React.FC<BaseBadgeProps> {
  Ribbon: typeof Badge.Ribbon;
}

export const BaseBadge: BaseBadgeInterface = ({ children, ...props }) => {
  return <S.Badge {...props}>{children}</S.Badge>;
};

BaseBadge.Ribbon = Badge.Ribbon;
