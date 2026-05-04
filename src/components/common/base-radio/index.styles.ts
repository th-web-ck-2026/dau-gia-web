import { Radio as AntRadio } from "antd";
import styled, { css } from "styled-components";

import { RadioSize } from ".";

const radioSizeStyle = {
  small: css`
    font-size: ${({ theme }) => theme.fontSizes.xxs};

    &.ant-radio-wrapper {
      .ant-radio-inner,
      .ant-radio-inner::after {
        width: 0.875rem;
        height: 0.875rem;
      }

      .ant-radio-inner::after {
        transform: scale(0.45);
        margin-block-start: -0.5rem;
        margin-inline-start: -0.5rem;
      }
    }
  `,

  medium: css`
    font-size: ${({ theme }) => theme.fontSizes.xs};
  `,

  large: css`
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
};

export const Radio = styled(AntRadio) <{ size?: RadioSize }>`
  .ant-radio-checked .ant-radio-inner {
    background-color: ${({ theme }) => theme.textBrand};
    border-color: ${({ theme }) => theme.textBrand};
  }

  &:hover .ant-radio-checked .ant-radio-inner {
    background-color: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }

  .ant-radio-inner::after {
    background-color: ${({ theme }) => theme.white};
  }

  ${({ size = "medium" }) => radioSizeStyle[size]}
`;


export const RadioGroup = styled(AntRadio.Group) <{ horizontal?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.paddings.xxxs};
  flex-direction: ${({ horizontal }) => (horizontal ? "row" : "column")};
`;

export const RadioButton = AntRadio.Button;


