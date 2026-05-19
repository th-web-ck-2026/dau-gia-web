import { Layout } from "antd";
import styled from "styled-components";

export const HeaderWrapper = styled(Layout.Header)`
  height: auto;
  padding: 0;
  background: ${({ theme }) => theme.white};
  line-height: normal;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 100;
`;

export const TopBar = styled.div`
  background-color: ${({ theme }) => theme.backgroundBrand || "#1A3F75"};
  height: 42px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 96px;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSizes.xxs};

  @media (min-width: ${({ theme }) => theme.breakpoints.xl}px) {
    padding: 4px 70px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 4px 20px;
    justify-content: space-between;
  }
`;

export const TopBarLeft = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: 12px;
  }
`;

export const TopBarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: ${({ theme }) => theme.white};

  svg {
    font-size: ${({ theme }) => theme.fontSizes.xxs};
  }

  span {
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    text-wrap: nowrap;
  }
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
`;

export const LanguageSelectorWrapper = styled.div`
  svg {
    color: ${({ theme }) => theme.white};
  }
`;

export const MainBar = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg - 1}px) {
    height: 70px;
    padding: 8px 16px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg - 1}px) {
    display: none;
  }
`;

export const ClockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  line-height: 1.25;
  gap: 2px;
`;

export const ClockTime = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.textMain};
`;

export const ClockDate = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.textMain};
`;

export const WifiIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(31, 58, 160, 0.6);
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 4px;
  border-radius: 50%;

  &:hover {
    color: ${({ theme }) => theme.primary || "#1f3aa0"};
    background-color: rgba(31, 58, 160, 0.05);
  }
`;

/* Mobile elements */

export const MobileSection = styled.div`
  display: none;
  align-items: center;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg - 1}px) {
    display: flex;
  }
`;

export const MobileHamburger = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.primary1};
  }
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 10px;
`;

export const DrawerMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DrawerMenuItem = styled.div<{ $selected: boolean }>`
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;

  a {
    display: block;
    padding: 12px 16px;
    color: ${({ $selected, theme }) =>
      $selected ? theme.primary || "#1f3aa0" : "#374151"};
    background-color: ${({ $selected }) =>
      $selected ? "#d6e3ff" : "transparent"};
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ $selected }) =>
        $selected ? "#d6e3ff" : "rgba(31, 58, 160, 0.05)"};
      color: ${({ theme }) => theme.primary || "#1f3aa0"};
    }
  }
`;

export const DrawerDivider = styled.div`
  height: 1px;
  background-color: #e5e7eb;
  margin: 8px 0;
`;

export const DrawerFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DrawerClock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f3f4f6;
  padding: 12px 16px;
  border-radius: 8px;
`;
