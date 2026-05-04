import React from "react";

import { SliderSingleProps } from "antd";

import * as S from "./index.styles";

export type BaseSliderProps = SliderSingleProps;

export const BaseSlider: React.FC<SliderSingleProps> = (props) => {
  return <S.Slider {...props} />;
};
