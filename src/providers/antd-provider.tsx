"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";

import type { PropsWithChildrenType } from "@/interfaces";

export function AntdProvider({ children }: PropsWithChildrenType) {
  return <AntdRegistry>{children}</AntdRegistry>;
}
