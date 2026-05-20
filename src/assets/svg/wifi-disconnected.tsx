import React from "react";

import Icon from "@ant-design/icons";
import type { GetProps } from "antd";

const WifiDisconnectedSvg: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <g clipPath="url(#clip0_59_2712)">
      <path
        d="M0.857178 0.856934L23.1429 23.1426"
        stroke="currentColor"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0001 22.7141C12.5957 22.7141 13.1669 22.4775 13.5881 22.0563C14.0092 21.6352 14.2458 21.064 14.2458 20.4684C14.2458 19.8728 14.0092 19.3016 13.5881 18.8804C13.1669 18.4593 12.5957 18.2227 12.0001 18.2227C11.4045 18.2227 10.8333 18.4593 10.4121 18.8804C9.991 19.3016 9.75439 19.8728 9.75439 20.4684C9.75439 21.064 9.991 21.6352 10.4121 22.0563C10.8333 22.4775 11.4045 22.7141 12.0001 22.7141Z"
        fill="currentColor"
        fillOpacity={0.3}
      />
      <path
        d="M7.76575 15.4286C8.3234 14.8569 8.98956 14.4023 9.72518 14.0914M4.04575 12.5314C5.08975 11.4823 6.20061 10.8412 6.20061 10.8412M9.51432 9.50229C9.51432 9.50229 10.5292 9.21944 12.0086 9.21944C13.4887 9.21945 14.954 9.51207 16.3207 10.0805C17.6873 10.6489 18.928 11.4818 19.9715 12.5314M5.96918 5.92629C8.84866 4.73302 12.0174 4.42071 15.0744 5.02888C18.1314 5.63705 20.9394 7.13837 23.1429 9.34287M0.857178 9.34287C1.47432 8.72572 2.11203 8.21658 2.87318 7.64572M12 22.7143C12.5956 22.7143 13.1668 22.4777 13.588 22.0565C14.0091 21.6354 14.2458 21.0642 14.2458 20.4686C14.2458 19.873 14.0091 19.3018 13.588 18.8806C13.1668 18.4595 12.5956 18.2229 12 18.2229C11.4044 18.2229 10.8332 18.4595 10.4121 18.8806C9.99092 19.3018 9.75432 19.873 9.75432 20.4686C9.75432 21.0642 9.99092 21.6354 10.4121 22.0565C10.8332 22.4777 11.4044 22.7143 12 22.7143Z"
        stroke="currentColor"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_59_2712">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const WifiDisconnectedIcon: React.FC<Partial<GetProps<typeof Icon>>> = (
  props
) => <Icon component={WifiDisconnectedSvg} {...props} />;

export default WifiDisconnectedIcon;
