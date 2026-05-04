import React from "react";

import { CheckboxProps, CheckboxRef } from "antd";

import * as S from "./index.styles";

export type BaseCheckboxProps = CheckboxProps;

const Checkbox = React.forwardRef<CheckboxRef, BaseCheckboxProps>(
  (props, ref) => {
    return <S.Checkbox {...props} ref={ref} />;
  }
);

Checkbox.displayName = "BaseCheckbox";

type CheckboxForwardRef = typeof Checkbox;

interface IBaseCheckbox extends CheckboxForwardRef {
  Group: typeof S.CheckboxGroup;
}

export const BaseCheckbox = Checkbox as IBaseCheckbox;

BaseCheckbox.Group = S.CheckboxGroup;
