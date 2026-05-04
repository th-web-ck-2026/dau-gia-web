"use client";

import { PropsWithChildren } from "react";

import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

import { ConfigProvider } from "antd";

import { defaultLocale, languages } from "@/i18n/routing";

export type LocaleProviderProps = PropsWithChildren<{
  locale: string;
  messages: AbstractIntlMessages;
}>;

export function LocaleProvider({
  children,
  locale,
  messages,
}: LocaleProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ConfigProvider
        locale={
          languages[(locale as keyof typeof languages) ?? defaultLocale].antd
        }
      >
        {children}
      </ConfigProvider>
    </NextIntlClientProvider>
  );
}
