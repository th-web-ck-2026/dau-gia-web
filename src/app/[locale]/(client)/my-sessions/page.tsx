"use client";

import React, { useEffect } from "react";

import { Spin } from "antd";
import styled from "styled-components";

import MySessionsDashboard from "@/features/client/my-sessions";
import { useAuth } from "@/hooks/common";
import { useRouter } from "@/i18n/routing";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const MySessionsPage = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !user?.isVerified) {
        router.push("/");
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated || !user?.isVerified) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return <MySessionsDashboard />;
};

export default MySessionsPage;
