import { ReactNode } from "react";

import { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";

import { ClientWrapper } from "@/providers";
import { LocaleProvider } from "@/providers";
import { generateLocalizedMetadata } from "@/utils/server/seo";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale,
    namespace: "metadata",
    titleKey: "title",
    descriptionKey: "description",
  });
}

export default async function LocaleLayout({ children }: Props) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <ClientWrapper>{children}</ClientWrapper>
    </LocaleProvider>
  );
}
