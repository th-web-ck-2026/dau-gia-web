import { Switch as AntdSwitch } from "antd";
import styled from "styled-components";

export const Switch = styled(AntdSwitch)`
  &.ant-switch-checked:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary1};
  }

  &.ant-switch[aria-checked="false"] {
    background-image:
      linear-gradient(
        to right,
        ${({ theme }) => theme.disabled},
        ${({ theme }) => theme.disabled}
      ),
      linear-gradient(
        to right,
        ${({ theme }) => theme.backgroundColorBase},
        ${({ theme }) => theme.backgroundColorBase}
      );
  }
`;
