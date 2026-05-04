import React from "react";

import { Descriptions, DescriptionsProps } from "antd";

export type BaseDescriptionsProps = DescriptionsProps;

interface IBaseDescriptions extends React.FC<BaseDescriptionsProps> {
  Item: typeof Descriptions.Item;
}

export const BaseDescriptions: IBaseDescriptions = (props) => {
  return <Descriptions {...props} />;
};

BaseDescriptions.Item = Descriptions.Item;
