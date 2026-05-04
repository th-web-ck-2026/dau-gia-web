import { Select as AntSelect } from "antd";
import styled from "styled-components";

import { Dimension } from "@/styles/theme.types";
import { normalizeProp } from "@/styles/theme.utils";

export interface InternalSelectProps {
  $width?: Dimension;
  $shadow?: boolean;
}

export const Select = styled(AntSelect)<InternalSelectProps>`
  width: ${(props) => props.$width && normalizeProp(props.$width)};
  box-shadow: ${(props) => props.$shadow && props.theme.boxShadow};

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  &.ant-select-borderless {
    background: ${({ theme }) => theme.backgroundSecondary} !important;
    border-radius: 7px;
  }

  .ant-select-selection-placeholder {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  .ant-select-item {
    min-height: unset;
    padding-block: 5px;
  }

  &.ant-select-disabled .ant-select-selector {
    background: ${({ theme }) => theme.backgroundSecondary} !important;
    color: ${({ theme }) => theme.textQuaternary} !important;
    border: 1px solid ${({ theme }) => theme.border} !important;
  }

  &.ant-select-multiple {
    &.ant-select-disabled .ant-select-selection-item {
      color: ${({ theme }) => theme.selectionDisabled};
      border: 1px solid ${({ theme }) => theme.borderBase};
    }

    .ant-select-selection-item {
      border: 1px solid ${({ theme }) => theme.split};
      margin-inline-end: 11px;
    }

    .ant-select-selector {
      padding-inline-start: 11px;
    }
  }
`;
