"use client";

import { ErrorBoundary } from "@/components/common";
import type { PropsWithChildrenType } from "@/interfaces";

import { AntdProvider } from "./antd-provider";
import { ReduxProvider } from "./redux-provider";
import { TanstackProvider } from "./tanstack-provider";
import { AppThemeProvider } from "./theme-provider";

export function ClientWrapper({ children }: PropsWithChildrenType) {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <AppThemeProvider>
          <TanstackProvider>
            <AntdProvider>{children}</AntdProvider>
          </TanstackProvider>
        </AppThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}
