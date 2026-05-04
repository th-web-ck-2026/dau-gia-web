import { getMessages } from "next-intl/server";

import { NotFound } from "@/components/common";
import { defaultLocale } from "@/i18n/routing";
import { ClientWrapper, LocaleProvider } from "@/providers";

const RootNotFound = async () => {
  const messages = await getMessages({ locale: defaultLocale });

  return (
    <ClientWrapper>
      <LocaleProvider locale={defaultLocale} messages={messages}>
        <NotFound />
      </LocaleProvider>
    </ClientWrapper>
  );
};

export default RootNotFound;
