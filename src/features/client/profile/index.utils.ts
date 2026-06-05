import { useTranslations } from "next-intl";

import type { BreadcrumbProps } from "antd";

const useClientProfile = () => {
  const t = useTranslations("client.profile");
  const items: BreadcrumbProps["items"] = [
    {
      title: t("infomationAccount"),
    },
  ];
  return {
    items,
    t,
  };
};

export default useClientProfile;
