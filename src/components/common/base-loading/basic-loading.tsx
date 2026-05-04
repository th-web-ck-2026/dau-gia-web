import React from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const BasicLoading: React.FC<{ fullScreen?: boolean }> = ({
  fullScreen = false,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: fullScreen ? "100vh" : "100%",
        width: fullScreen ? "100vw" : "100%",
        background: "rgba(0, 0, 0, 0.05)",
        position: fullScreen ? "fixed" : "relative",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
  );
};
