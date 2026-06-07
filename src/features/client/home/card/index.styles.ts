import styled from "styled-components";

import { BaseTypography } from "@/components/common/base-typography";

export const CardWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.boxShadow};
  cursor: pointer;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.boxShadowHover};
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
    display: block;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const AuctionImageWrapper = styled(CardImageWrapper)`
  height: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: 170px;
  }
`;

export const TenderImageWrapper = styled(CardImageWrapper)`
  height: 200px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: 170px;
  }
`;

export const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.success};
  background: ${({ theme }) => theme.bgSuccess50};
  padding: 0.2rem 0.6rem;
  border-radius: ${({ theme }) => theme.borderRadius.xxxxl};
  width: fit-content;

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const CardTitle = styled(BaseTypography.Paragraph)`
  && {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.textMain};
    line-height: 1.45;
  }
`;

export const CardFieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CardField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

export const FieldLabel = styled.span`
  color: ${({ theme }) => theme.textSenary};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const FieldValue = styled.span`
  color: ${({ theme }) => theme.textMain};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: right;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const BidCountText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.textSenary};
`;

export const CardDescription = styled(BaseTypography.Paragraph)`
  && {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.textQuaternary};
    line-height: 1.55;
  }
`;

export const KeyAssetWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  position: relative;
  cursor: pointer;
  aspect-ratio: 4/3;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.boxShadowHover};
  }

  &:hover img {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
    display: block;
  }
`;

export const KeyAssetOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    rgba(0, 0, 0, 0.72) 100%
  );
`;

export const KeyAssetContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const KeyAssetMeta = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: rgba(255, 255, 255, 0.8);
`;

export const KeyAssetTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.background};
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const KeyAssetFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const KeyAssetPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.background};
`;

export const KeyAssetBids = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: rgba(255, 255, 255, 0.75);
`;

export const KeyAssetLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.background};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${({ theme }) => theme.primary3};
  }
`;

interface CardGridProps {
  $columns?: number;
}

export const CardGrid = styled.div<CardGridProps>`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(
    ${({ $columns = 4 }) => $columns},
    minmax(0, 1fr)
  );

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    grid-template-columns: repeat(
      ${({ $columns = 4 }) => Math.min($columns, 3)},
      minmax(0, 1fr)
    );
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
