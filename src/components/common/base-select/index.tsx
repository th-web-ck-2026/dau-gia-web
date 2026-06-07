import React, { ComponentProps, RefObject } from "react";

import { Select as AntSelect } from "antd";
import { RefSelectProps } from "antd/lib/select";

import { Dimension } from "@/styles/theme.types";

import * as S from "./index.styles";

export const { Option } = AntSelect;

export interface BaseSelectProps extends ComponentProps<typeof AntSelect> {
  width?: Dimension;
  shadow?: boolean;
  className?: string;
}

type CompoundedComponent = React.ForwardRefExoticComponent<
  BaseSelectProps & React.RefAttributes<RefSelectProps>
> & {
  Option: typeof Option;
};

export const BaseSelect = React.forwardRef<RefSelectProps, BaseSelectProps>(
  ({ className, width, shadow, children, ...props }, ref) => (
    <S.Select
      getPopupContainer={(triggerNode) => triggerNode.parentNode}
      ref={ref as unknown as RefObject<RefSelectProps>}
      className={className}
      $width={width}
      $shadow={shadow}
      {...props}
    >
      {children}
    </S.Select>
  )
) as CompoundedComponent;

BaseSelect.Option = Option;
BaseSelect.displayName = "BaseSelect";
