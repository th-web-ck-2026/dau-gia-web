import styled from "styled-components";

import { BaseTypography } from "@/components/common";

export const Title = styled(BaseTypography.Title)`
  margin-bottom: 4px !important;
  color: ${({ theme }) => theme.textMain};
  text-transform: uppercase;
`;

export const SubTitle = styled(BaseTypography.Text)`
  display: block;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.subText};
`;
