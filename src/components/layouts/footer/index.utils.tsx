import { useState } from "react";

import { useTranslations } from "next-intl";

import { useFeedback } from "@/hooks/common";

const useFooterUtils = () => {
  const t = useTranslations("footer");
  const infoT = useTranslations("infomation");
  const commonT = useTranslations("common");
  const { notification } = useFeedback();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      notification.warning({
        message: t("emailPlaceholder"),
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      notification.error({
        message: commonT("email") + " " + t("emailPlaceholder"),
      });
      return;
    }

    notification.success({
      message: commonT("success"),
    });
    setEmail("");
  };

  return {
    t,
    infoT,
    email,
    setEmail,
    handleSubscribe,
  };
};

export default useFooterUtils;
