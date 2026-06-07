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
  background: ${({ theme }) => theme.background || "#ffffff"};
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  border-radius: ${({ theme }) => theme.borderRadius.md || "8px"};
`;

export const TableCard = styled.div`
  background: ${({ theme }) => theme.background || "#ffffff"};
  border: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  border-radius: ${({ theme }) => theme.borderRadius.md || "8px"};
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
  border-top: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
`;

export const ModalSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md || "16px"};
  font-weight: ${({ theme }) => theme.fontWeights.bold || "700"};
  color: ${({ theme }) => theme.textMain || "#111827"};
  border-left: 4px solid ${({ theme }) => theme.primary || "#3b82f6"};
  padding-left: 8px;
  margin-bottom: 20px;
  margin-top: 8px;
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;
