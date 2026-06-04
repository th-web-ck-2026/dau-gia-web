import { ReactNode } from "react";

import { getLocale, getMessages } from "next-intl/server";

import { ClientWrapper } from "@/providers";
import { LocaleProvider } from "@/providers";

type Props = {
  children: ReactNode;
};

export default async function LocaleLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <ClientWrapper>{children}</ClientWrapper>
    </LocaleProvider>
  );
}
