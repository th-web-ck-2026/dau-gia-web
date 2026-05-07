import styled from "styled-components";
import { BaseTypography } from "@/components/common";

export const Title = styled(BaseTypography.Title)`
  margin-bottom: 4px !important;
  color: ${({ theme }) => theme.textMain} !important;
  text-transform: uppercase;
`;

export const SubTitle = styled(BaseTypography.Text)`
  display: block;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.subText};
`;

export const FooterText = styled.div`
  text-align: center;
  margin-top: 24px;
  color: ${({ theme }) => theme.subText};
  
  a {
    color: ${({ theme }) => theme.textBrand};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-left: 4px;
  }
`;
