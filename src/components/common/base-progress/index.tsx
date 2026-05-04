import React from "react";

import { Progress, ProgressProps } from "antd";

export type BaseProgressProps = ProgressProps;

export const BaseProgress: React.FC<ProgressProps> = (props) => {
  return (
    <Progress
      {...props}
      status={props.status || "normal"}
      format={props.format || ((percent) => `${percent}%`)}
    />
  );
};
