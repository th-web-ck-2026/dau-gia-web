import React from "react";

import { BaseInputProps, BaseInputRef } from "../../base-input";
import * as S from "./index.styles";

interface InputPasswordProps extends BaseInputProps {
  className?: string;
  visibilityToggle?: boolean;
  iconRender?: (open: boolean) => React.ReactNode;
}

export const InputPassword = React.forwardRef<BaseInputRef, InputPasswordProps>(
  ({ className, children, ...props }, ref) => (
    <S.InputPassword ref={ref} className={className} {...props}>
      {children}
    </S.InputPassword>
  )
);

InputPassword.displayName = "InputPassword";
