import styled from "styled-components";

import { BaseTag } from "@/components/common/base-tag";
import { BaseTypography } from "@/components/common/base-typography";

export const CardWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primary};
  }
`;

export const CardImageWrapper = styled.div`
  width: 100%;
  height: 200px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: 170px;
  }
`;

export const TagOverlayLeft = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
`;

export const TagOverlayRight = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
`;

export const TypeTag = styled(BaseTag)`
  && {
    display: inline-flex;
    width: fit-content;
    padding: 4px 8px;
    align-items: center;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSizes.xxs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    border: none;
    color: ${({ theme }) => theme.textSessionDefault};
    background-color: ${({ theme }) => theme.bgSessionDefault};
  }
`;

export const CardBody = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

export const CardDescription = styled(BaseTypography.Paragraph)`
  && {
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    color: ${({ theme }) => theme.textQuaternary};
    line-height: 1.55;
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

export const ParticipantCountText = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.textSenary};
`;
