"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useTranslations } from "next-intl";

import {
  ApartmentOutlined,
  CheckCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";

import { selectRole } from "@/api/auth";
import { getMe } from "@/api/user";
import { BaseButton, BaseModal } from "@/components/common";
import { UserRoleType } from "@/constants";
import { useAppMutation, useAuth, useFeedback } from "@/hooks/common";
import { User } from "@/interfaces/auth";
import { ResponseData } from "@/interfaces/common";
import { setCredentials } from "@/stores/auth/auth.slice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.paddings.xs} 0;
`;

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.xxl};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-bottom: ${(props) => props.theme.margins.xs};
  color: ${(props) => props.theme.textMain};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: ${(props) => props.theme.margins.xl};
  text-align: center;
  max-width: 420px;
  line-height: 1.6;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  margin-bottom: ${(props) => props.theme.margins.xl};

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const RoleCard = styled.div<{ $active: boolean }>`
  border: 2px solid
    ${(props) => (props.$active ? props.theme.primary : props.theme.border)};
  background: ${(props) =>
    props.$active ? props.theme.primary1 : props.theme.background};
  border-radius: 12px;
  padding: ${(props) => props.theme.paddings.lg}
    ${(props) => props.theme.paddings.sm};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: translateY(-4px);
    border-color: ${(props) =>
      props.$active ? props.theme.primary : props.theme.primary4};
  }
`;

const IconWrapper = styled.div<{ $active: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 14px;
  background: ${(props) =>
    props.$active ? props.theme.primary2 : props.theme.backgroundSecondary};
  color: ${(props) =>
    props.$active ? props.theme.primary : props.theme.textSecondary};
  transition: all 0.3s ease;
`;

const CardTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.md};
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  margin-bottom: ${(props) => props.theme.margins.xs};
  color: ${(props) => props.theme.textMain};
`;

const CardDesc = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xs};
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.5;
  margin: 0;
`;

const CheckMark = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 18px;
  color: ${(props) => props.theme.success};
`;

interface ProfileGuardProps {
  children: React.ReactNode;
}

export const ProfileGuard: React.FC<ProfileGuardProps> = ({ children }) => {
  const t = useTranslations("auth.selectRole");
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth();
  const { notification } = useFeedback();
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<UserRoleType | null>(null);

  const { mutate, isPending } = useAppMutation<
    ResponseData<{ user: User }>,
    Error,
    { userRoles: UserRoleType }
  >(selectRole, {
    onSuccess: async (response) => {
      notification.success({
        message: t("success"),
        placement: "topRight",
      });
      if (response?.data?.user) {
        dispatch(setCredentials(response.data.user));
      }
      try {
        const fresh = await getMe();
        if (fresh?.data) {
          dispatch(setCredentials(fresh.data));
        }
      } catch {
        queryClient.invalidateQueries({ queryKey: ["getMe"] });
      }
    },
  });

  const showModal = isAuthenticated && user && !user.userRoles;

  const handleSave = () => {
    if (!selectedRole) return;
    mutate({ userRoles: selectedRole });
  };

  return (
    <>
      {children}
      <BaseModal
        open={!!showModal}
        closable={false}
        maskClosable={false}
        keyboard={false}
        footer={null}
        size="medium"
        centered
      >
        <Container>
          <Title>{t("title")}</Title>
          <Subtitle>{t("subtitle")}</Subtitle>

          <CardContainer>
            <RoleCard
              $active={selectedRole === UserRoleType.CA_NHAN}
              onClick={() => setSelectedRole(UserRoleType.CA_NHAN)}
            >
              {selectedRole === UserRoleType.CA_NHAN && (
                <CheckMark>
                  <CheckCircleFilled />
                </CheckMark>
              )}
              <IconWrapper $active={selectedRole === UserRoleType.CA_NHAN}>
                <UserOutlined />
              </IconWrapper>
              <CardTitle>{t("individual")}</CardTitle>
              <CardDesc>{t("individualDesc")}</CardDesc>
            </RoleCard>

            <RoleCard
              $active={selectedRole === UserRoleType.TO_CHUC}
              onClick={() => setSelectedRole(UserRoleType.TO_CHUC)}
            >
              {selectedRole === UserRoleType.TO_CHUC && (
                <CheckMark>
                  <CheckCircleFilled />
                </CheckMark>
              )}
              <IconWrapper $active={selectedRole === UserRoleType.TO_CHUC}>
                <ApartmentOutlined />
              </IconWrapper>
              <CardTitle>{t("organization")}</CardTitle>
              <CardDesc>{t("organizationDesc")}</CardDesc>
            </RoleCard>
          </CardContainer>

          <BaseButton
            type="primary"
            size="large"
            disabled={!selectedRole}
            loading={isPending}
            onClick={handleSave}
            style={{
              width: "100%",
              height: 44,
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            {t("saveButton")}
          </BaseButton>
        </Container>
      </BaseModal>
    </>
  );
};
