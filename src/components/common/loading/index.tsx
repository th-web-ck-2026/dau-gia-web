"use client";

import React from "react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { BaseFlex } from "../base-flex";

export const Loading: React.FC = () => {
  return (
    <BaseFlex
      align="center"
      justify="center"
      vertical
      style={{
        minHeight: "100vh",
      }}
    >
      <DotLottieReact
        src="/lotties/loading.lottie"
        loop
        autoplay
        style={{ width: 300, height: 300 }}
      />
    </BaseFlex>
  );
};
