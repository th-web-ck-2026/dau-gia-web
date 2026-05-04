import React from "react";

import { Radio, RadioProps } from "antd";

import * as S from "./index.styles";

export type RadioSize = "small" | "medium" | "large";

export interface BaseRadioProps extends RadioProps {
  size?: RadioSize;
}

interface IBaseRadio extends React.FC<BaseRadioProps> {
  Group: typeof Radio.Group;
  Button: typeof Radio.Button;
}

export const BaseRadio: IBaseRadio = (props) => {
  const { size, ...restProps } = props;
  return <S.Radio size={size} {...restProps} />;
};

BaseRadio.Group = S.RadioGroup;
BaseRadio.Button = S.RadioButton;
