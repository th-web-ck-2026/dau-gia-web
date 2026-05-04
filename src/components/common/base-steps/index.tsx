import React from "react";

import { StepsProps } from "antd";

import * as S from "./index.styles";

export type BaseStepsProps = React.PropsWithChildren<StepsProps>;

export const BaseSteps: React.FC<BaseStepsProps> = ({
  children,
  ...otherProps
}) => {
  return <S.Steps {...otherProps}>{children}</S.Steps>;
};
