"use client";

import React, { PropsWithChildren, useLayoutEffect, useState } from "react";

import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, App as FeedbackProvider } from "antd";
import { DefaultTheme, ThemeProvider } from "styled-components";

import { Loading } from "@/components/common/loading";
import { getThemeConfig } from "@/styles/theme.config";
import { getGlobalStyles } from "@/styles/theme.global";
import { themeObject } from "@/styles/themes/theme-variables";

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
      <ThemeProvider theme={currentTheme as DefaultTheme}>
        <Loading />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={currentTheme as DefaultTheme}>
      <style>{getGlobalStyles(currentTheme as DefaultTheme)}</style>
      <ConfigProvider theme={themeConfig}>
        <FeedbackProvider>{props.children}</FeedbackProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
};
