import { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import { getLocale } from "next-intl/server";

import StyledComponentsRegistry from "@/lib/styled-components-registry";

import { beVietnamPro, inter, sfPro } from "./fonts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Đấu giá online",
  description: "Đấu giá online",
};

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${sfPro.variable} ${inter.variable} ${beVietnamPro.variable}`}
    >
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
