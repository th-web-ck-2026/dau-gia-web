import { getMessages } from "next-intl/server";

import { Loading } from "@/components/common";
import { defaultLocale } from "@/i18n/routing";
import { ClientWrapper, LocaleProvider } from "@/providers";

const RootLoading = async () => {
  const messages = await getMessages({ locale: defaultLocale });

  return (
    <ClientWrapper>
      <LocaleProvider locale={defaultLocale} messages={messages}>
        <Loading />
      </LocaleProvider>
    </ClientWrapper>
  );
};

export default RootLoading;
