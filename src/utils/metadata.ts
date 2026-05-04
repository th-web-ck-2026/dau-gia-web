import { Metadata } from "next";

export interface MetaProps {
  title?: string;
  templateTitle?: string;
  description?: string;
  siteName?: string;
  robots?: string;
  type?: string;
  image?: string;
  url?: string;
}

const defaultMeta = {
  title: "BIDWAR",
  siteName: "BIDWAR",
  description: "Hệ thống đấu giá trực tuyến chuyên nghiệp",
  robots: "follow, index",
  type: "website",
  image: "/images/og-image.png",
  url: "https://bidwar.vn",
};

export const generateMetadataUtil = (props: MetaProps): Metadata => {
  const meta = {
    ...defaultMeta,
    ...props,
  };

  meta.title = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return {
    title: meta.title,
    description: meta.description,
    robots: meta.robots,
    openGraph: {
      type: meta.type as any, // eslint-disable-line @typescript-eslint/no-explicit-any
      siteName: meta.siteName,
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : [],
      url: meta.url,
    },
  };
};
