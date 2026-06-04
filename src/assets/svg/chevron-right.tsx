import React from "react";

import Icon from "@ant-design/icons";
import type { GetProps } from "antd";

const ChevronRightSvg: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M5.25 10.5L8.75 7L5.25 3.5"
      stroke="#A6A6A6"
      strokeWidth="0.875"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRightIcon: React.FC<Partial<GetProps<typeof Icon>>> = (props) => (
  <Icon component={ChevronRightSvg} {...props} />
);

export default ChevronRightIcon;
