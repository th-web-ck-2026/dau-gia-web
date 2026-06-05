"use client";

import React from "react";

import { Loading } from "@/components/common";
import { useAuth } from "@/hooks/common";

import { ProfileGuard } from "./profile-guard";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return <Loading />;
  }

  return <ProfileGuard>{children}</ProfileGuard>;
};
