import React from "react";

import { Drawer as AntDrawer, DrawerProps } from "antd";
import styled from "styled-components";

const StyledDrawer = styled(AntDrawer)`
  .ant-drawer-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  .ant-drawer-body {
    padding: 1.5rem;
  }

  .ant-drawer-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid ${({ theme }) => theme.border};
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .ant-drawer-title {
    color: ${({ theme }) => theme.textMain};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .ant-drawer-close {
    color: ${({ theme }) => theme.textLight};

    &:hover {
      color: ${({ theme }) => theme.textMain};
    }
  }
`;

export interface BaseDrawerProps extends DrawerProps {
  children: React.ReactNode;
}

export const BaseDrawer: React.FC<BaseDrawerProps> = ({
  children,
  ...props
}) => {
  return <StyledDrawer {...props}>{children}</StyledDrawer>;
};

export default BaseDrawer;
