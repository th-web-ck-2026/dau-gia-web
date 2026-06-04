"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { BaseButton } from "../base-button";
import { BaseResult } from "../base-result";
import { BaseSpace } from "../base-space";
import { BaseTypography } from "../base-typography";
import * as S from "./index.styles";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const getFallbackTranslations = () => {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isEn =
    pathname.startsWith("/en") ||
    pathname.startsWith("/en/") ||
    pathname.includes("/en/");

  if (isEn) {
    return {
      title: "Something went wrong",
      subTitle:
        "This page is temporarily unavailable. Please try again or return to the homepage.",
      retry: "Try again",
      goHome: "Back to Home",
    };
  }

  return {
    title: "Có lỗi xảy ra",
    subTitle:
      "Trang này tạm thời không thể hiển thị. Vui lòng thử lại hoặc quay về trang chủ.",
    retry: "Thử lại",
    goHome: "Về trang chủ",
  };
};

interface FallbackProps {
  error?: Error;
  reset?: () => void;
  title?: string;
  subTitle?: string;
  retryText?: string;
  goHomeText?: string;
}

export const ErrorBoundaryFallback: React.FC<FallbackProps> = ({
  error,
  reset,
  title,
  subTitle,
  retryText,
  goHomeText,
}) => {
  const fallbackTranslations = getFallbackTranslations();

  const displayTitle = title || fallbackTranslations.title;
  const displaySubTitle = subTitle || fallbackTranslations.subTitle;
  const displayRetryText = retryText || fallbackTranslations.retry;
  const displayGoHomeText = goHomeText || fallbackTranslations.goHome;

  const handleRetry = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <S.ErrorContainer align="center" justify="center" vertical>
      <BaseResult
        icon={
          <div style={{ width: 300, height: 300, margin: "0 auto" }}>
            <DotLottieReact src="/lotties/500.lottie" loop autoplay />
          </div>
        }
        title={
          <BaseTypography.Title level={2} style={{ margin: "24px 0 8px" }}>
            {displayTitle}
          </BaseTypography.Title>
        }
        subTitle={
          <BaseSpace
            direction="vertical"
            size="middle"
            style={{ width: "100%", maxWidth: 600 }}
          >
            <BaseTypography.Text type="secondary" style={{ fontSize: 16 }}>
              {displaySubTitle}
            </BaseTypography.Text>
            {process.env.NODE_ENV === "development" && error && (
              <S.DevStackTrace>{error.stack || error.message}</S.DevStackTrace>
            )}
          </BaseSpace>
        }
        extra={
          <BaseSpace size="middle" style={{ marginTop: 12 }}>
            <BaseButton
              type="primary"
              size="large"
              onClick={handleRetry}
              style={{ minWidth: 120 }}
            >
              {displayRetryText}
            </BaseButton>
            <BaseButton
              size="large"
              onClick={handleGoHome}
              style={{ minWidth: 120 }}
            >
              {displayGoHomeText}
            </BaseButton>
          </BaseSpace>
        }
      />
    </S.ErrorContainer>
  );
};

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          reset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
