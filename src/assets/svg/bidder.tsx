import React from "react";

import Icon from "@ant-design/icons";
import type { GetProps } from "antd";

const BidderIconSvg: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
  >
    <g clipPath="url(#clip0_157_1608)">
      <path d="M17.9998 34.1742V27.7456H3.85693V34.1742" fill="white" />
      <path
        d="M1.28564 34.1742H20.5714M17.9999 34.1742V27.7456H3.85707V34.1742"
        stroke="#4147D5"
        strokeWidth="2.57143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0237 2.57661L10.8051 11.7952C10.3231 12.2774 10.0522 12.9313 10.0522 13.6132C10.0522 14.295 10.3231 14.949 10.8051 15.4312L14.8783 19.5043C15.3605 19.9864 16.0144 20.2572 16.6963 20.2572C17.3781 20.2572 18.0321 19.9864 18.5143 19.5043L27.7328 10.2858C28.2149 9.80354 28.4857 9.1496 28.4857 8.46775C28.4857 7.7859 28.2149 7.13197 27.7328 6.64975L23.6571 2.57661C23.1749 2.09454 22.521 1.82373 21.8391 1.82373C21.1573 1.82373 20.5033 2.09454 20.0211 2.57661"
        fill="#D7E0FF"
      />
      <path
        d="M20.0237 2.57661L10.8051 11.7952C10.3231 12.2774 10.0522 12.9313 10.0522 13.6132C10.0522 14.295 10.3231 14.949 10.8051 15.4312L14.8783 19.5043C15.3605 19.9864 16.0144 20.2572 16.6963 20.2572C17.3781 20.2572 18.0321 19.9864 18.5143 19.5043L27.7328 10.2858C28.2149 9.80354 28.4857 9.1496 28.4857 8.46775C28.4857 7.7859 28.2149 7.13197 27.7328 6.64975L23.6571 2.57661C23.1749 2.09454 22.521 1.82373 21.8391 1.82373C21.1573 1.82373 20.5033 2.09454 20.0211 2.57661M23.1428 14.8886L34.7143 26.46"
        stroke="#4147D5"
        strokeWidth="2.57143"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_157_1608">
        <rect width="36" height="36" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const BidderIcon: React.FC<Partial<GetProps<typeof Icon>>> = (props) => (
  <Icon component={BidderIconSvg} {...props} />
);

export default BidderIcon;
