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

export const ForgotPasswordWrapper = styled.div`
  text-align: right;
  margin-bottom: 24px;
  
  a {
    color: ${({ theme }) => theme.inputPlaceholder};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

export const FooterText = styled.div`
  text-align: center;
  margin-top: 24px;
  color: ${({ theme }) => theme.inputPlaceholder};
  
  a {
    color: ${({ theme }) => theme.primary};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-left: 8px;
  }
`;
