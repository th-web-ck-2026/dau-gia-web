import styled from "styled-components";

import { BaseButton, BaseTypography } from "@/components/common";

export const NotificationBellWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  .ant-badge {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BellButton = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.textMain || "#000000"};
  padding: 6px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    color: ${({ theme }) => theme.primary || "#1f3aa0"};
  }
`;

export const DropdownContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white || "#ffffff"};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
`;

export const Title = styled(BaseTypography.Title)`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.textMain || "#000000"};
  }
`;

export const ClearAllButton = styled(BaseButton)`
  && {
    font-size: 13px;
    padding: 0;
    height: auto;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.primary || "#1f3aa0"};
    opacity: 0.85;
    box-shadow: none;

    &:hover {
      color: #3b55c4;
      background: transparent;
      opacity: 1;
    }
  }
`;

export const ScrollContainer = styled.div`
  max-height: 360px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const NotificationItem = styled.div<{ $isUnread: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ $isUnread }) =>
    $isUnread ? "#f0f5ff" : "transparent"};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:hover {
    background-color: ${({ $isUnread }) => ($isUnread ? "#e6f0ff" : "#fafafa")};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemTitle = styled.div<{ $isUnread: boolean }>`
  font-weight: ${({ $isUnread }) => ($isUnread ? 600 : 500)};
  color: ${({ theme }) => theme.textMain || "#000000"};
  font-size: 14px;
  line-height: 1.4;
  padding-right: 12px;
`;

export const ItemContent = styled.div`
  color: ${({ theme }) => theme.subText || "#666666"};
  font-size: 13px;
  line-height: 1.4;
`;

export const ItemTime = styled.div`
  color: #999999;
  font-size: 11px;
  margin-top: 2px;
`;

export const UnreadDot = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #1890ff;
`;

export const EmptyState = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: ${({ theme }) => theme.subText || "#999999"};
  font-size: 14px;
`;

export const LoadMoreWrapper = styled.div`
  padding: 12px;
  text-align: center;
  border-top: 1px solid #f5f5f5;
`;

export const LoadMoreButton = styled(BaseButton)`
  && {
    width: 100%;
    height: 32px;
    border-radius: 4px;
  }
`;
