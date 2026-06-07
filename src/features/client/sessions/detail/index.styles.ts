import styled from "styled-components";

import { BaseButton } from "@/components/common/base-button";

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 4rem;
`;

export const ContentRoot = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 42px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 0 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 0 12px;
  }
`;

export const ContentWrapper = styled.section`
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.textMain || "#1A1A1A"};
`;

export const SessionSubInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.textSenary || "#6B7280"};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 7.5fr) minmax(0, 4.5fr);
  gap: 2rem;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 0;
  width: 100%;
`;

export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
  width: 100%;
`;

export const GalleryCard = styled.div`
  background: ${({ theme }) => theme.background || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.border || "#E5E7EB"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  min-width: 0;
  width: 100%;
  overflow: hidden;
`;

export const TabCard = styled.div`
  background: ${({ theme }) => theme.background || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.border || "#E5E7EB"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  min-width: 0;
  width: 100%;
  overflow: hidden;

  .ant-tabs-nav {
    margin-bottom: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 1rem;
  }
`;

export const DescriptionText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.textMain || "#374151"};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const ActionCard = styled.div`
  background: ${({ theme }) => theme.background || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.border || "#E5E7EB"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.textSenary || "#6B7280"};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CardValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.textMain || "#1A1A1A"};
`;

export const CountdownLabel = styled(CardLabel)`
  color: ${({ theme }) => theme.textMain || "#1A1A1A"};
`;

export const WarningBox = styled.div`
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  text-align: center;
`;

export const WarningText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #92400e;
  font-weight: 500;
  line-height: 1.5;
`;

export const WarningButtonRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  .ant-btn {
    flex: 1;
  }
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoItem = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border || "#F3F4F6"};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

export const InfoLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.textSenary || "#6B7280"};
  font-weight: 500;
`;

export const InfoValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.textMain || "#1A1A1A"};
  font-weight: 600;
`;

export const QuickBidGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 10px;
`;

export const QuickBidButton = styled(BaseButton)<{ $isReset?: boolean }>`
  && {
    background-color: ${({ theme, $isReset }) =>
      $isReset ? "#FEE2E2" : theme.bgBrandSubtle || "#EFF6FF"};
    color: ${({ theme, $isReset }) =>
      $isReset ? "#ce1e1eff" : theme.primary || "#1F3AA0"};
    border-color: ${({ theme, $isReset }) =>
      $isReset ? "#FCA5A5" : theme.primary3 || "#BFDBFE"};
    font-weight: ${({ theme }) => theme.fontWeights.semibold || 600};
    font-size: ${({ theme }) => theme.fontSizes.xs || "0.875rem"};
    height: 38px;
    border-radius: ${({ theme }) => theme.borderRadius.md || "8px"};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:hover,
    &:focus {
      background-color: ${({ theme, $isReset }) =>
        $isReset ? "#FCA5A5" : theme.primary1 || "#DBEAFE"} !important;
      color: ${({ theme, $isReset }) =>
        $isReset ? "#a92828ff" : theme.primary7 || "#1D4ED8"} !important;
      border-color: ${({ theme, $isReset }) =>
        $isReset ? "#EF4444" : theme.primary || "#2563EB"} !important;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
      font-size: ${({ theme }) => theme.fontSizes.xxs || "0.75rem"};
      height: 34px;
    }
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PodiumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: flex-end;
  gap: 16px;
  padding: 24px 0 12px;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 576px) {
    gap: 8px;
  }
`;

export const PodiumStep = styled.div<{ $rank: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ $rank }) => {
    if ($rank === 1) return "linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 100%)";
    if ($rank === 2) return "linear-gradient(180deg, #F9FAFB 0%, #F3F4F6 100%)";
    return "linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 100%)";
  }};
  border: 2px solid
    ${({ $rank }) => {
      if ($rank === 1) return "#F59E0B";
      if ($rank === 2) return "#D1D5DB";
      return "#F97316";
    }};
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  padding: 16px 8px;
  height: ${({ $rank }) => {
    if ($rank === 1) return "180px";
    if ($rank === 2) return "140px";
    return "110px";
  }};
  justify-content: flex-end;
  order: ${({ $rank }) => {
    if ($rank === 1) return 2;
    if ($rank === 2) return 1;
    return 3;
  }};
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

export const Crown = styled.div`
  position: absolute;
  top: -24px;
  font-size: 24px;
`;

export const PodiumAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.border || "#E5E7EB"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }) => theme.textMain || "#1A1A1A"};
  margin-bottom: 8px;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const PodiumName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.textMain || "#1A1A1A"};
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 4px;
`;

export const PodiumValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  font-weight: 700;
  color: ${({ theme }) => theme.primary || "#2B7FFF"};
  text-align: center;
  margin-top: 4px;
`;

export const LeaderboardHeader = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.textMain || "#1A1A1A"};
  margin: 1.5rem 0 1rem;
`;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TabGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const TabGridItem = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #f3f4f6;
`;

export const TabGridLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
`;

export const TabGridValue = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
`;

export const LiveLeaderboardCard = styled.div`
  background: ${({ theme }) => theme.background || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.border || "#E5E7EB"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  width: 100%;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 1rem;
  }
`;

export const LeaderboardTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 12px;
`;

export const LeaderboardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LeaderboardParticipantCount = styled.span`
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
`;

export const OwnerCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
`;

export const OwnerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
`;

export const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OwnerName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1f2937;
`;

export const OwnerEmail = styled.div`
  font-size: 13px;
  color: #4b5563;
`;

export const RightOverviewCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
  min-width: 0;
  width: 100%;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 16px;
  }
`;

export const RightCardTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const RightCardLabel = styled.div`
  font-size: 14px;
  color: #4b5563;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const OverviewInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
`;

export const OverviewInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OverviewLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs || "0.875rem"};
  color: ${({ theme }) => theme.textSenary || "#6B7280"};
  font-weight: ${({ theme }) => theme.fontWeights.medium || 500};
`;

export const OverviewValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md || "1rem"};
  color: ${({ theme }) => theme.primary || "#1F3AA0"};
  font-weight: ${({ theme }) => theme.fontWeights.bold || 700};
`;

export const RightLiveStatusCard = styled.div`
  background: #f0fdfa;
  border: 1px solid #ccfbf1;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LiveStatusHeader = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0f766e;
`;

export const LiveStatusPriceSection = styled.div`
  background: #ffffff;
  border: 1px solid #e6f4f1;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LiveStatusPriceLabel = styled.span`
  font-size: 12px;
  color: #0d9488;
  font-weight: 600;
`;

export const LiveStatusPriceValue = styled.span`
  font-size: 20px;
  font-weight: 800;
  color: #0d9488;
`;

export const LiveStatusSubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

export const LiveStatusSubBlock = styled.div`
  background: #ffffff;
  border: 1px solid #e6f4f1;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const LiveStatusSubLabel = styled.span`
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
`;

export const LiveStatusSubValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #1f2937;
`;

export const RightActionCard = styled.div`
  background: ${({ theme }) => theme.background || "#FFFFFF"};
  border: 1px solid ${({ theme }) => theme.border || "#E5E7EB"};
  border-radius: ${({ theme }) => theme.borderRadius.lg || "16px"};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 16px;
  }
`;

export const ActionCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ActionCardSubPrice = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #2563eb;
  margin-top: 4px;
`;

export const BidInputLabel = styled.div`
  font-size: 12px;
  color: #4b5563;
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
