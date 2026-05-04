import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { generateMetadataUtil } from "@/utils/metadata";


interface LocalizedMetaProps {
  locale: string;
  namespace: string;
  titleKey: string;
  descriptionKey?: string;
}

export const generateLocalizedMetadata = async ({
  locale,
  namespace,
  titleKey,
  descriptionKey,
}: LocalizedMetaProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace });

  return generateMetadataUtil({
    templateTitle: t(titleKey),
    description: descriptionKey ? t(descriptionKey) : undefined,
  });
};

