import styled from "styled-components";

import { BaseButton, BaseTypography } from "@/components/common";

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

  .ant-avatar {
    flex-shrink: 0;
    img {
      object-fit: cover;
    }
  }
`;

export const DropdownWrapper = styled.div`
  width: 300px;
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

    .ant-avatar {
      flex-shrink: 0;
      img {
        object-fit: cover;
        image-rendering: -webkit-optimize-contrast;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: ${({ theme }) => theme.textMain};

      .name {
        display: inline-flex;
        align-items: center;
        gap: 4px;
      }
    }
  }
`;

export const NameText = styled(BaseTypography.Text)`
  && {
    font-size: ${({ theme }) => theme.fontSizes.xs} !important;
    font-weight: ${({ theme }) => theme.fontWeights.semibold} !important;
    color: inherit !important;
  }
`;

export const EmailText = styled(BaseTypography.Text)`
  && {
    font-size: ${({ theme }) => theme.fontSizes.xxs} !important;
    font-weight: ${({ theme }) => theme.fontWeights.regular} !important;
    color: ${({ theme }) => theme.subText} !important;
    display: block;
  }
`;
