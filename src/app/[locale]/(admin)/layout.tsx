"use client";

import React, { useEffect } from "react";

import { Spin } from "antd";
import styled from "styled-components";

import AdminHeader from "@/components/layouts/admin-header";
import AdminSidebar from "@/components/layouts/admin-sidebar";
import { Role } from "@/constants";
import { useAuth } from "@/hooks/common";
import { useRouter } from "@/i18n/routing";

const AdminLayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.backgroundSecondary || "#f5f6fa"};
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const ContentBody = styled.main`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.layoutBodyBg || "#f9fafb"};
  overflow-y: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.background || "#ffffff"};
`;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || user?.role !== Role.ADMIN) {
        router.push("/");
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated || user?.role !== Role.ADMIN) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return (
    <AdminLayoutWrapper>
      <AdminSidebar />
      <MainContent>
        <AdminHeader />
        <ContentBody>{children}</ContentBody>
      </MainContent>
    </AdminLayoutWrapper>
  );
}
