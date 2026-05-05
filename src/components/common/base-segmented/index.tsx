import { FC } from "react";

import type { SegmentedProps } from "antd";
import { Segmented } from "antd";

export type BaseSegmentedProps = SegmentedProps;

export const BaseSegmented: FC<BaseSegmentedProps> = (props) => {
    return <Segmented {...props} />;
};
