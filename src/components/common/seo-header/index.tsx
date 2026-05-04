import { Metadata } from "next";

interface MetaProps {
  title?: string;
  siteName?: string;
  templateTitle?: string;
  description?: string;
  date?: string;
  url?: string;
  type?: string;
  robots?: string;
  image?: string;
  author?: string;
}

const defaultMeta = {
  title: "Base FE Next",
  siteName: "Base FE Next",
  description: "Base FE Next Template",
  url: "",
  type: "website",
  robots: "follow, index",
  image: "",
  author: "",
};

export const generateMetadata = (props: MetaProps): Metadata => {
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
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : [],
    },
  };
};
