import React from "react";

import { Tabs, TabsProps } from "antd";

export type BaseTabsProps = TabsProps;

interface IBaseTabs extends React.FC<BaseTabsProps> {
  TabPane: typeof Tabs.TabPane;
}

export const BaseTabs: IBaseTabs = ({ children, ...props }) => {
  return <Tabs {...props}>{children}</Tabs>;
};

BaseTabs.TabPane = Tabs.TabPane;
