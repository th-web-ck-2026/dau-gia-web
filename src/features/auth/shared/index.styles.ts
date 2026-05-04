import styled from "styled-components";
import { BaseRow, BaseCol, BaseFlex } from "@/components/common";

export const AuthLayoutContainer = styled(BaseRow)`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.white};
`;

export const BannerSection = styled(BaseCol)`
  background-color: #0089ED;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`;


export const FormSection = styled(BaseCol)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const FormWrapper = styled(BaseFlex)`
  width: 100%;
  max-width: 440px;
  flex-direction: column;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 60px;
  z-index: 2;
  
  svg {
    width: 200px;
    height: auto;
  }
`;

export const ElementWrapper = styled.div`
  z-index: 1;
  
  svg {
    width: 100%;
    max-width: 500px;
    height: auto;
  }
`;
