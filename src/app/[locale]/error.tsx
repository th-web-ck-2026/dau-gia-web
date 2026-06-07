"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

import { ErrorBoundaryFallback } from "@/components/common";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations("errorBoundary");

  useEffect(() => {
    console.error("Next.js page-level error caught:", error);
  }, [error]);

  return (
    <ErrorBoundaryFallback
      error={error}
      reset={reset}
      title={t("title")}
      subTitle={t("subTitle")}
      retryText={t("retry")}
      goHomeText={t("goHome")}
    />
  );
}
