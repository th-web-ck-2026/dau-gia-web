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

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  gap: 2rem;
  margin-bottom: 8px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 12px 4px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeights.semibold : theme.fontWeights.medium};
  color: ${({ theme, $active }) =>
    $active ? theme.primary : theme.textQuaternary};
  position: relative;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &::after {
    content: "";
    display: ${({ $active }) => ($active ? "block" : "none")};
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
  }
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

export const ModalSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.textMain};
  border-left: 4px solid ${({ theme }) => theme.primary};
  padding-left: 8px;
  margin-bottom: 16px;
  margin-top: 8px;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;

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
`;

export const ImageTitle = styled.span`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.textSecondary};
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.border};
`;
