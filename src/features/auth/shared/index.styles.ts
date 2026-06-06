import styled from "styled-components";

import { BaseCol, BaseFlex, BaseRow } from "@/components/common";

export const AuthLayoutContainer = styled(BaseRow)<{ $reversed?: boolean }>`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.white};
  align-items: stretch;
  position: relative;
  ${({ $reversed }) => $reversed && `flex-direction: row-reverse;`}
`;

export const BackButtonWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
`;

export const BackCircleLink = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.white};
    color: #404040;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);

    &:hover {
      color: ${({ theme }) => theme.primary} !important;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    svg {
      font-size: 16px;
    }
  }
`;

export const BannerSection = styled(BaseCol)`
  background-color: ${({ theme }) => theme.backgroundBrand};
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
  position: relative;
`;

export const LanguageWrapper = styled.div<{ $reversed?: boolean }>`
  position: absolute;
  top: 24px;
  ${({ $reversed }) => ($reversed ? "left: 24px;" : "right: 24px;")}
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
