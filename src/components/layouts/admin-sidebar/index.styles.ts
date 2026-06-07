import { Layout } from "antd";
import styled from "styled-components";

const { Sider } = Layout;

export const StyledSider = styled(Sider)`
  background: ${({ theme }) =>
    theme.backgroundBrand900 || "#111827"} !important;
  border-right: 1px solid ${({ theme }) => theme.border || "#1f2937"};
  min-height: 100vh;
  position: sticky;
  top: 0;
  z-index: 100;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export const SidebarHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border || "#1f2937"};
  overflow: hidden;
  white-space: nowrap;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 180px;

  svg {
    width: 100%;
    height: auto;
    max-height: 36px;
    filter: brightness(0) invert(1);
  }
`;

export const MenuWrapper = styled.div`
  flex: 1;
  padding: 16px 0;

  .ant-menu {
    background: transparent !important;
    border: none;
  }

  .ant-menu-item {
    margin: 4px 8px !important;
    width: calc(100% - 16px) !important;
    border-radius: ${({ theme }) => theme.borderRadius.xxxs} !important;
    color: #9ca3af !important;
    transition: all 0.2s ease;

    &:hover {
      color: #ffffff !important;
      background: rgba(255, 255, 255, 0.05) !important;
    }

    &.ant-menu-item-selected {
      color: #ffffff !important;
      background: rgba(59, 130, 246, 0.15) !important;
      font-weight: ${({ theme }) => theme.fontWeights.semibold} !important;

      &::after {
        display: none !important;
      }
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: 16px 8px;
  border-top: 1px solid ${({ theme }) => theme.border || "#1f2937"};

  .ant-menu {
    background: transparent !important;
    border: none;
  }

  .ant-menu-item {
    margin: 0 !important;
    width: 100% !important;
    border-radius: ${({ theme }) => theme.borderRadius.xxxs} !important;
    color: #9ca3af !important;

    &:hover {
      color: #ffffff !important;
      background: rgba(255, 255, 255, 0.05) !important;
    }
  }
`;
