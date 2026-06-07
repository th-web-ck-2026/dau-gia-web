import styled from "styled-components";

export const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const PodiumContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2.5rem;
  margin: 2rem 0;
  padding: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: 1rem;
    margin: 1rem 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const PodiumItem = styled.div<{ $rank: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  order: ${({ $rank }) => ($rank === 1 ? 2 : $rank === 2 ? 1 : 3)};
  transform: ${({ $rank }) => ($rank === 1 ? "scale(1.1)" : "scale(1)")};
  z-index: ${({ $rank }) => ($rank === 1 ? 2 : 1)};
  transition: transform 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    order: unset;
    transform: none;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.borderTertiary};
    padding-bottom: 1rem;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const AvatarWrapper = styled.div<{ $rank: number }>`
  position: relative;
  width: ${({ $rank }) => ($rank === 1 ? "96px" : "80px")};
  height: ${({ $rank }) => ($rank === 1 ? "96px" : "80px")};

  .ant-avatar {
    width: 100% !important;
    height: 100% !important;
    border: 3px solid
      ${({ theme, $rank }) =>
        $rank === 1
          ? theme.textRankGold
          : $rank === 2
            ? theme.textRankSilver
            : theme.textRankCopper};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CrownWrapper = styled.div`
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  font-size: 24px;
  color: ${({ theme }) => theme.textRankGold};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
  animation: bounce 2s infinite ease-in-out;

  @keyframes bounce {
    0%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-4px);
    }
  }
`;

export const RankBadge = styled.div<{ $rank: number }>`
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 2px solid ${({ theme }) => theme.background};

  background-color: ${({ theme, $rank }) =>
    $rank === 1
      ? theme.textRankGold
      : $rank === 2
        ? theme.textRankSilver
        : theme.textRankCopper};
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

export const PodiumInfo = styled.div`
  text-align: center;
  margin-top: 0.25rem;
`;

export const PodiumName = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.textMain};
  margin-bottom: 0.15rem;
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PodiumSubtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.textSenary};
`;

export const TableSection = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.boxShadow};
  overflow: hidden;

  .rank-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }

  .rank-1 {
    background-color: ${({ theme }) => theme.bgRankGold};
    color: ${({ theme }) => theme.textRankGold};
  }
  .rank-2 {
    background-color: ${({ theme }) => theme.bgRankSilver};
    color: ${({ theme }) => theme.textRankSilver};
  }
  .rank-3 {
    background-color: ${({ theme }) => theme.bgRankCopper};
    color: ${({ theme }) => theme.textRankCopper};
  }
  .rank-other {
    background-color: ${({ theme }) => theme.bgSessionDefault};
    color: ${({ theme }) => theme.textSessionDefault};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 0.75rem;
  }
`;
