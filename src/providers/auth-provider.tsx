"use client";

import React from "react";

import { Loading } from "@/components/common";
import { useAuth } from "@/hooks/common";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return <Loading />;
  }

  return <>{children}</>;
};
