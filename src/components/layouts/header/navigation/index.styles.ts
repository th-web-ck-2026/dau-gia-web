import styled from "styled-components";

import { BaseMenu } from "@/components/common";

export const NavigationMenuWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg - 1}px) {
    display: none;
  }
`;

export const StyledMenu = styled(BaseMenu)`
  border-bottom: none !important;
  background: transparent !important;
  display: flex;
  align-items: center;
  gap: 2px;
  height: 100%;
  width: auto;

  .ant-menu-item {
    font-size: ${({ theme }) => theme.fontSizes.xs} !important;
    font-weight: ${({ theme }) => theme.fontWeights.regular} !important;
    color: ${({ theme }) => theme.textMain} !important;
    padding: 8px 16px !important;
    height: 33px !important;
    line-height: 33px !important;
    display: flex !important;
    align-items: center !important;
    transition: all 0.2s ease !important;
    top: 0 !important;
    border-radius: 6px !important;
    margin: 0 !important;

    &::after {
      display: none !important;
    }

    &:hover {
      color: ${({ theme }) => theme.primary} !important;
      background-color: ${({ theme }) => theme.primary1} !important;
    }

    a {
      color: ${({ theme }) => theme.textMain} !important;
      display: block;
      width: 100%;
      height: 100%;

      &:hover {
        color: ${({ theme }) => theme.primary} !important;
      }
    }

    &-selected {
      color: ${({ theme }) => theme.primary} !important;
      background-color: ${({ theme }) => theme.primary1} !important;

      a {
        color: ${({ theme }) => theme.primary} !important;
        font-weight: ${({ theme }) => theme.fontWeights.semibold} !important;
      }
    }
  }
`;
