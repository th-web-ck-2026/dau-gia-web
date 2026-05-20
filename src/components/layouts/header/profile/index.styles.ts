import styled from "styled-components";

import { BaseButton } from "@/components/common";

export const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Button = styled(BaseButton)`
  width: 100%;
  max-width: 120px;
  padding: 8px 16px !important;
  height: 35px !important;
  border-radius: 4px !important;
`;

export const UserTrigger = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.textMain};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: ${({ theme }) => theme.primary || "#1f3aa0"};
  }
`;

export const DropdownWrapper = styled.div`
  width: 230px;
  border-radius: 6px;
  padding: 8px 4px;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid #e5e5e5;

  .drop-top {
    display: flex;
    padding: 10px;
    align-items: center;
    gap: 10px;
    align-self: stretch;

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: ${({ theme }) => theme.textMain};

      .name {
        font-size: ${({ theme }) => theme.fontSizes.xs} !important;
        font-weight: ${({ theme }) => theme.fontWeights.semibold};
      }

      .email {
        font-size: ${({ theme }) => theme.fontSizes.xxs};
        font-weight: ${({ theme }) => theme.fontWeights.regular};
        color: ${({ theme }) => theme.subText};
      }
    }
  }
`;
