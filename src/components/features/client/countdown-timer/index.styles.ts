import styled from "styled-components";

import { TrangThaiPhien } from "@/constants";

export const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 16px 0;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    gap: 6px;
  }
`;

export const TimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: ${({ theme }) => theme.borderRadius.md || "12px"};
  padding: 10px;
  min-width: 84px;
  height: 84px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    min-width: 62px;
    height: 64px;
    padding: 6px;
    border-radius: ${({ theme }) => theme.borderRadius.xxxs || "8px"};
  }
`;

export const TimeValue = styled.span<{ $status: TrangThaiPhien }>`
  font-size: ${({ theme }) => theme.fontSizes.xxxxl || "2rem"};
  font-weight: ${({ theme }) => theme.fontWeights.bold || 700};
  color: ${({ theme, $status }) => {
    switch ($status) {
      case TrangThaiPhien.MO:
        return theme.textSessionInProgress || "#13C2C2";
      case TrangThaiPhien.CONG_BO:
        return theme.textSessionUpcoming || "#2B7FFF";
      case TrangThaiPhien.DONG:
        return theme.textSessionSuccess || "#00C950";
      case TrangThaiPhien.HUY:
        return theme.textSessionCancel || "#FB2C36";
      case TrangThaiPhien.NHAP:
      default:
        return theme.textSessionDefault || "#555556";
    }
  }};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: ${({ theme }) => theme.fontSizes.xl || "1.25rem"};
  }
`;

export const TimeLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs || "0.875rem"};
  color: ${({ theme }) => theme.textSenary || "#6B7280"};
  margin-top: 4px;
  font-weight: ${({ theme }) => theme.fontWeights.medium || 500};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    font-size: ${({ theme }) => theme.fontSizes.xxs || "0.75rem"};
    margin-top: 2px;
  }
`;

export const TextTimer = styled.div<{ $status: TrangThaiPhien }>`
  font-size: ${({ theme }) => theme.fontSizes.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights.bold || 700};
  text-align: center;
  color: #9ca3af;
  padding: 12px;
`;
