import LoginPage from "@/features/auth/login";
import { generateLocalizedMetadata } from "@/utils/server/seo";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    return generateLocalizedMetadata({
        locale,
        namespace: "auth",
        titleKey: "loginTitle",
        descriptionKey: "loginSubTitle",
    });
}

export default function Page() {
    return <LoginPage />;
}