import { getMessages } from "next-intl/server";

import { Loading } from "@/components/common";
import { defaultLocale } from "@/i18n/routing";
import { ClientWrapper, LocaleProvider } from "@/providers";

const RootLoading = async () => {
  const messages = await getMessages({ locale: defaultLocale });

  return (
    <LocaleProvider locale={defaultLocale} messages={messages}>
      <ClientWrapper>
        <Loading />
      </ClientWrapper>
    </LocaleProvider>
  );
};

export default RootLoading;
