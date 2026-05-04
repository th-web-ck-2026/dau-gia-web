import Image from "next/image";

import styled from "styled-components";

import { colorTypeFrom } from "@/styles/theme.utils";

import { BaseSpace } from "../base-space";
import { NotificationType } from "./index";

export const SpaceWrapper = styled(BaseSpace)<{ type: NotificationType }>`
  .ant-notification-notice-icon {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    color: ${(props) => props.theme[colorTypeFrom(props.type)]};
  }
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.textMain};
`;

export const Description = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.subText};
`;

export const NotificationIcon = styled(Image)`
  width: ${({ theme }) => theme.heights.xs};
  height: ${({ theme }) => theme.heights.xs};
`;
