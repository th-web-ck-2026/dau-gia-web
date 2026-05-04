import { Card as AntCard } from "antd";
import styled from "styled-components";

import { Dimension } from "@/styles/theme.types";
import { normalizeProp } from "@/styles/theme.utils";

interface CardInternalProps {
  $padding?: Dimension | readonly [number, number];
  $autoHeight?: boolean;
}

export const Card = styled(AntCard)<CardInternalProps>`
  ${(props) => props.$padding && `padding: ${normalizeProp(props.$padding)}`};
  ${(props) => !props.$autoHeight && "height: 100%"};

  .ant-card-head-title {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    color: ${({ theme }) => theme.textMain};
  }
`;
