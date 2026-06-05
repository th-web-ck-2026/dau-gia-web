import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 80px 80px 80px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.lg - 1 || 1023}px) {
    padding: 24px 16px 48px 16px;
  }
`;

export const SidebarCard = styled.div`
  background: ${({ theme }) => theme.white || "#ffffff"};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    border-radius: 50%;
    object-fit: cover;
  }

  .anticon-user {
    font-size: 48px;
    color: #9ca3af;
  }
`;

export const AvatarEditBtn = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  span {
    font-size: 14px;
    color: #4b5563;
  }
`;

export const Greetings = styled.span`
  font-size: 14px;
  color: #9ca3af;
  margin-top: 12px;
  text-align: center;
`;

export const UserName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 4px 0 0 0;
  text-align: center;
`;

export const RoleBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(31, 58, 160, 0.08);
  border: 1px solid rgba(31, 58, 160, 0.2);
  color: ${({ theme }) => theme.primary || "#1f3aa0"};
  font-size: 12px;
  font-weight: 600;
  border-radius: 16px;
  padding: 4px 12px;
  margin-top: 8px;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
`;

export const InfoLabel = styled.span`
  color: #6b7280;
`;

export const InfoValue = styled.span`
  color: #111827;
  font-weight: 600;
  word-break: break-all;
`;

export const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

export const MenuItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${({ $active, theme }) =>
    $active ? theme.primary || "#1f3aa0" : "transparent"};
  color: ${({ $active }) => ($active ? "#ffffff" : "#374151")};

  &:hover {
    background-color: ${({ $active, theme }) =>
      $active ? theme.primary || "#1f3aa0" : "rgba(31, 58, 160, 0.05)"};
    color: ${({ $active, theme }) =>
      $active ? "#ffffff" : theme.primary || "#1f3aa0"};
  }

  span {
    font-size: 16px;
  }
`;

export const ContentCard = styled.div`
  background: ${({ theme }) => theme.white || "#ffffff"};
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const HeaderIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #374151;
`;

export const HeaderTitles = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`;

export const HeaderSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #9ca3af;
`;

export const ContentDivider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 20px 0;
`;

export const RequiredMark = styled.span`
  color: #ef4444;
  margin-left: 4px;
`;

export const FormSectionTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 24px 0 16px 0;

  span {
    font-size: 16px;
    color: #374151;
  }
`;

export const PasswordStatusWrapper = styled.div`
  margin-top: -8px;
  margin-bottom: 20px;
`;

export const RuleBox = styled.div`
  margin-top: 8px;
`;

export const RuleTitle = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const RuleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RuleItem = styled.div<{ $passed: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 20px;
  color: ${({ $passed }) => ($passed ? "#22c55e" : "#9ca3af")};
  transition: color 0.2s ease;
`;

export const RuleIcon = styled.span`
  width: 16px;
  display: inline-flex;
  justify-content: center;
  font-weight: 700;
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const UploadTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

export const UploadSubTitle = styled.span`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 400;
  margin-left: 6px;
`;

export const DraggerWrapper = styled.div`
  .ant-upload-drag {
    background: #ffffff;
    border: 1px dashed #d1d5db;
    border-radius: 8px;
    transition: border-color 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme.primary || "#1f3aa0"};
    }
  }

  .ant-upload-btn {
    padding: 24px 0 !important;
  }
`;

export const DraggerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  .upload-icon {
    font-size: 24px;
    color: #9ca3af;
  }

  .upload-text {
    font-size: 14px;
    color: #4b5563;
    font-weight: 500;
  }
`;

export const IdentityGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.sm || 576}px) {
    grid-template-columns: 1fr;
  }
`;
