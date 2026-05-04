import React from "react";

import { RateProps } from "antd";

import * as S from "./index.styles";

export type BaseRateProps = RateProps;

export const BaseRate: React.FC<BaseRateProps> = (props) => {
  return <S.Rate {...props} />;
};
