import styled from "styled-components";

import { BaseTypography } from "@/components/common";

const { Text } = BaseTypography;

export const ContentRoot = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 0 42px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 0 24px;
  }
`;

export const ContentWrapper = styled.section`
  width: 100%;
  max-width: 1440px;
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

export const ActionButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.border};
  gap: 2rem;
  margin-bottom: 1rem;
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

export const SessionTitleCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SessionImageWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const UploadPreviewImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.border};
`;

export const CriteriaListContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #fafafa;
`;

export const CriterionItem = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  margin-bottom: 1rem;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RemoveCriterionButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #ff4d4f;
  font-size: 1.25rem;
  z-index: 10;

  &:hover {
    color: #cf1322;
  }
`;

export const OptionsListContainer = styled.div`
  margin-top: 1rem;
  padding-left: 1.5rem;
  border-left: 2px dashed ${({ theme }) => theme.border};
`;

export const OptionItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 8px;
`;

export const OptionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.textSecondary};
`;

export const TitleTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SessionIdText = styled(Text)`
  font-size: 11px !important;
`;

export const TimeCellWrapper = styled.div`
  font-size: 12px;
`;

export const TimeLabel = styled.span`
  color: ${({ theme }) => theme.textMain};
`;

export const ParamsCellWrapper = styled.div`
  font-size: 12px;
`;

export const StatusSuccessText = styled.span`
  color: #52c41a;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const StatusDangerText = styled.span`
  color: #ff4d4f;
`;

export const StatusWarningText = styled.span`
  color: #faad14;
`;

export const StatusInfoText = styled.span`
  color: ${({ theme }) => theme.primary || "#1890ff"};
`;

export const FilterCard = styled.div`
  display: flex;
  gap: 1rem;
  background: ${({ theme }) => theme.background};
  padding: 1rem 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  flex-wrap: wrap;
  align-items: center;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const WinnerSection = styled.div`
  background: #f0f2f5;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 1.5rem;
`;

export const WinnerHeader = styled.h4`
  margin: 0 0 0.5rem 0;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const UploadPreviewWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const UploadItem = styled.div`
  position: relative;
`;

export const DeleteButton = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: rgba(255, 77, 79, 0.9);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
`;

export const TypeSelectorWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

export const TypeSelectorLabel = styled.span`
  margin-right: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const DrawerOptionLabelWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
