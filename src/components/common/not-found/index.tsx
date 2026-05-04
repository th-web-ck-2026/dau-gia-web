"use client";

import React from "react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { BaseFlex } from "../base-flex";

export const NotFound: React.FC = () => {
  return (
    <BaseFlex
      align="center"
      justify="center"
      vertical
      style={{
        minHeight: "100vh",
      }}
    >
      <DotLottieReact src="/lotties/404.lottie" loop autoplay />
    </BaseFlex>
  );
};
