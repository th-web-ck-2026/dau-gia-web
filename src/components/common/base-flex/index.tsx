import { forwardRef } from "react";

import type { FlexProps } from "antd";

import * as S from "./index.styles";

export type BaseFlexProps = FlexProps;

export const BaseFlex = forwardRef<HTMLDivElement, BaseFlexProps>(
  (props, ref) => <S.Flex ref={ref} {...props} />
);

BaseFlex.displayName = "BaseFlex";
