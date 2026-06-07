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

export const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

export const TableCard = styled.div`
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0;
  overflow-x: auto;

  .ant-table-thead > tr > th::before {
    display: none !important;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const StatusBadge = styled.span<{ $done: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: ${({ theme, $done }) =>
    $done ? `${theme.success}22` : `${theme.warning}22`};
  color: ${({ theme, $done }) => ($done ? theme.success : theme.warning)};
`;

export const TypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  background: ${({ theme }) => `${theme.primary}18`};
  color: ${({ theme }) => theme.primary};
`;

/* Modal styles */
export const ModalSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.textMain};
  border-left: 4px solid ${({ theme }) => theme.primary};
  padding-left: 8px;
  margin-bottom: 16px;
  margin-top: 24px;

  &:first-child {
    margin-top: 8px;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.textMain};
  word-break: break-word;
`;

export const ContentBlock = styled.div`
  background: ${({ theme }) => theme.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius.xxxxs};
  padding: 12px 16px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.textMain};
  line-height: 1.6;
  white-space: pre-wrap;
  margin-top: 4px;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageCard = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius.xxxs};
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.backgroundSecondary};
  overflow: hidden;
`;

export const NoImageText = styled.p`
  color: ${({ theme }) => theme.textQuaternary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0;
  text-align: center;
  padding: 16px 0;
`;

export const AlreadyProcessedBanner = styled.div`
  background: ${({ theme }) => `${theme.success}18`};
  border: 1px solid ${({ theme }) => `${theme.success}44`};
  border-radius: ${({ theme }) => theme.borderRadius.xxxxs};
  padding: 12px 16px;
  color: ${({ theme }) => theme.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;
