import { useState, useTransition } from "react";

import { useLocale } from "next-intl";

import { MenuProps } from "antd";

import EngIcon from "@/assets/svg/lang/en.svg";
import VieIcon from "@/assets/svg/lang/vi.svg";
import { BaseDropdown, BaseSpace } from "@/components/common";
import { LANGUAGE_OPTIONS, LOCALE } from "@/constants";
import { usePathname, useRouter } from "@/i18n/routing";

import * as S from "./index.styles";

const LanguageAction = ({ color }: { color?: string }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (lang: string) => {
    return lang === LOCALE.VI ? <VieIcon /> : <EngIcon />;
  };

  const currentLang =
    LANGUAGE_OPTIONS.find((opt) => opt.value === locale) || LANGUAGE_OPTIONS[1];

  const handleMenuClick = ({ key }: { key: string }) => {
    startTransition(() => {
      router.replace(pathname, { locale: key, scroll: false });
    });
  };

  const items: MenuProps["items"] = LANGUAGE_OPTIONS.map((option) => ({
    key: option.value,
    label: (
      <BaseSpace size={8}>
        <S.IconWrapper>{getIcon(option.value)}</S.IconWrapper>
        {option.label}
      </BaseSpace>
    ),
  }));

  return (
    <BaseDropdown
      menu={{
        items,
        onClick: handleMenuClick,
        selectedKeys: [locale],
      }}
      onOpenChange={setIsOpen}
      trigger={["hover"]}
      disabled={isPending}
    >
      <S.LangButton type="text">
        <BaseSpace align="center" size={8}>
          <S.IconWrapper>{getIcon(locale)}</S.IconWrapper>
          <S.LangLabel $color={color}>{currentLang.label}</S.LangLabel>
          <S.ChevronIcon $isOpen={isOpen} />
        </BaseSpace>
      </S.LangButton>
    </BaseDropdown>
  );
};

export default LanguageAction;
