import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { Locale } from "antd/lib/locale";
import en_US from "antd/locale/en_US";
import vi_VN from "antd/locale/vi_VN";

export const languages = {
  en: {
    name: "English",
    flag: "🇺🇸",
    unicode: "1f1fa-1f1f8",
    antd: en_US,
  },
  vi: {
    name: "Vietnamese",
    flag: "🇻🇳",
    unicode: "1f1fb-1f1f3",
    antd: vi_VN,
  },
};

export const MatchLanguage = (locale: string) => {
  return Object.keys(languages).includes(locale);
};

export type ILanguage = {
  [K in keyof typeof languages]: {
    name: string;
    flag: string;
    unicode: string;
    antd: Locale;
  };
};

export const defaultLocale: keyof typeof languages = "vi";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale,
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
