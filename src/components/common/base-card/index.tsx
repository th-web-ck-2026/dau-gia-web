import React from "react";

import { CardProps } from "antd";

import { WidthCategories } from "@/styles/theme.types";

import * as S from "./index.styles";

export interface BaseCardProps extends CardProps {
  className?: string;
  padding?: string | number | readonly [number, number];
  autoHeight?: boolean;
}

export const defaultPaddings = {
  xs: [30, 16],
  md: [40, 30],
  xl: [50, 60],
} as const satisfies WidthCategories;

export const BaseCard: React.FC<BaseCardProps> = ({
  className,
  padding,
  size,
  autoHeight = true,
  children,
  ...props
}) => {
  return (
    <S.Card
      size={size ?? "default"}
      className={className}
      variant="borderless"
      $padding={padding || padding === 0 ? padding : [40, 30]}
      $autoHeight={autoHeight}
      {...props}
    >
      {children}
    </S.Card>
  );
};
