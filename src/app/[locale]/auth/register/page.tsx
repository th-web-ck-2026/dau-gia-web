import RegisterPage from "@/features/auth/register";

import { generateLocalizedMetadata } from "@/utils/server/seo";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return generateLocalizedMetadata({
    locale,
    namespace: "auth",
    titleKey: "registerTitle",
    descriptionKey: "registerSubTitle",
  });
}

export default function Page() {
  return <RegisterPage />;
}
