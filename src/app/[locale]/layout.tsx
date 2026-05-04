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
    <ClientWrapper>
      <LocaleProvider locale={locale} messages={messages}>
        {children}
      </LocaleProvider>
    </ClientWrapper>
  );
}
