"use client";

import React from "react";
import { useAuth } from "@/hooks/common";
import { BaseSpin } from "@/components/common";
import styled from "styled-components";

const SplashContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.background};
`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <SplashContainer>
        <BaseSpin size="large" />
      </SplashContainer>
    );
  }

  return <>{children}</>;
};
