import styled from "styled-components";
import { BaseRow, BaseCol, BaseFlex } from "@/components/common";

export const AuthLayoutContainer = styled(BaseRow) <{ $reversed?: boolean }>`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.white};
  align-items: stretch;
  ${({ $reversed }) => $reversed && `flex-direction: row-reverse;`}
`;

export const BannerSection = styled(BaseCol)`
  background-color: #0089ED;
  position: relative;
  overflow: hidden;
`;

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
`;

export const FormSection = styled(BaseCol)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
`;

export const FormWrapper = styled(BaseFlex)`
  width: 100%;
  max-width: 550px;
  flex-direction: column;
`;

export const ElementWrapper = styled.div`
  z-index: 1;
  
  svg {
    width: 100%;
    max-width: 500px;
    height: auto;
  }
`;
