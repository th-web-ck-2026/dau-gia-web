import styled from "styled-components";

export const ContentRoot = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const DashboardTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.textMain};
  margin: 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background: ${({ theme }) => theme.background || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  border-radius: ${({ theme }) => theme.borderRadius.md || "8px"};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MetricTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm || "14px"};
  font-weight: ${({ theme }) => theme.fontWeights.semibold || "600"};
  color: ${({ theme }) => theme.textSecondary || "#4b5563"};
`;

export const MetricIconWrapper = styled.div<{ $color?: string; $bg?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  color: ${({ $color }) => $color || "#3b82f6"};
  background: ${({ $bg }) => $bg || "rgba(59, 130, 246, 0.1)"};
  font-size: 20px;
`;

export const MetricValue = styled.div`
  font-size: 28px;
  font-weight: ${({ theme }) => theme.fontWeights.bold || "700"};
  color: ${({ theme }) => theme.textMain || "#111827"};
`;

export const MetricSubText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs || "12px"};
  color: ${({ theme }) => theme.textQuaternary || "#9ca3af"};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MetricSubItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background: ${({ theme }) => theme.background || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  border-radius: ${({ theme }) => theme.borderRadius.md || "8px"};
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const ChartTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.md || "16px"};
  font-weight: ${({ theme }) => theme.fontWeights.bold || "700"};
  color: ${({ theme }) => theme.textMain || "#111827"};
  margin: 0 0 20px 0;
`;

export const LegendList = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 16px;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary || "#4b5563"};
`;

export const LegendColor = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: ${({ $color }) => $color};
`;
