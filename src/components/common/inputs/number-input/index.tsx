import React, { ReactNode } from "react";

import {
  InputNumber as AntdInputNumber,
  InputNumberProps as AntdInputNumberProps,
} from "antd";

import * as S from "./index.styles";

export interface InputNumberProps extends AntdInputNumberProps {
  block?: boolean;
  children?: ReactNode;
}

export const InputNumber = React.forwardRef<
  React.ElementRef<typeof AntdInputNumber>,
  InputNumberProps
>(({ children, block, ...props }, ref) => (
  <S.InputNumber ref={ref} $block={block} {...props}>
    {children}
  </S.InputNumber>
));

InputNumber.displayName = "InputNumber";
