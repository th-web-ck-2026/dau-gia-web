import { Button as AntButton } from "antd";
import styled, { css } from "styled-components";

import { Severity } from "@/styles/theme.types";
import { colorTypeFrom } from "@/styles/theme.utils";

interface BtnProps {
  $severity?: Severity;
  $noStyle?: boolean;
}

export const Button = styled(AntButton)<BtnProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition-duration: 0.3s;

  .ant-btn-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.ant-btn-sm {
    gap: 0.5rem;
  }

  &.ant-btn-disabled,
  &[disabled] {
    &.ant-btn-primary {
      border: none !important;
    }
  }

  ${(props) =>
    props.$noStyle &&
    css`
      width: unset;
      padding: 0;
      height: unset;
    `}

  ${(props) =>
    !props.danger &&
    css`
      &.ant-btn-link {
        span,
        a {
          text-decoration: underline;
        }
      }

      ${props.$severity &&
      css`
        background-color: rgba(
          ${props.theme.rgb[colorTypeFrom(props.$severity)]},
          0.2
        );
        border-color: ${props.theme[colorTypeFrom(props.$severity)]};
        color: ${props.theme[colorTypeFrom(props.$severity)]};

        &.ant-btn-default {
          &:focus,
          &:not(:disabled):hover {
            background-color: ${props.theme.background};
            border-color: rgba(
              ${props.theme.rgb[colorTypeFrom(props.$severity)]},
              0.9
            );
            color: rgba(
              ${props.theme.rgb[colorTypeFrom(props.$severity)]},
              0.9
            );
          }
        }

        &.ant-btn-primary {
          &:focus,
          &:not(:disabled):hover {
            background-color: rgba(
              ${props.theme.rgb[colorTypeFrom(props.$severity)]},
              0.3
            );
            border-color: ${props.theme[colorTypeFrom(props.$severity)]};
            color: ${props.theme[colorTypeFrom(props.$severity)]};
          }
        }
      `}
    `}
`;

