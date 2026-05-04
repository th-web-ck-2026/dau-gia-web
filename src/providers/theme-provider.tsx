"use client";

import React, { PropsWithChildren, useLayoutEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, App as FeedbackProvider, Spin } from "antd";
import { DefaultTheme, ThemeProvider } from "styled-components";

import { getThemeConfig } from "@/styles/theme.config";
import GlobalStyle from "@/styles/theme.global";
import { themeObject } from "@/styles/themes/theme-variables";

const loadingStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100%",
};

export const AppThemeProvider = (props: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);
  const currentTheme = themeObject.light;
  const themeConfig = React.useMemo(
    () => getThemeConfig(currentTheme as DefaultTheme),
    [currentTheme]
  );

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div style={loadingStyles}>
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  return (
    <ThemeProvider theme={currentTheme as DefaultTheme}>
      <GlobalStyle />
      <ConfigProvider theme={themeConfig}>
        <FeedbackProvider>{props.children}</FeedbackProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
};
