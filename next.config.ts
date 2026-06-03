import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const allowedDomains = process.env.ALLOWED_IMAGE_DOMAINS
  ? process.env.ALLOWED_IMAGE_DOMAINS.split(",").map((d) => d.trim())
  : [];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: allowedDomains.map((domain) => ({
      protocol: "https",
      hostname: domain,
      pathname: "/**",
    })),
  },
  transpilePackages: ["antd", "@ant-design"],
  compiler: {
    styledComponents: true,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);
