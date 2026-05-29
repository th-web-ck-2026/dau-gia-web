import styled from "styled-components";

export const SectionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.textMain};
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const ViewAllLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.textBrand};
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.75;
    color: ${({ theme }) => theme.textBrand};
  }
`;

export const SectionContent = styled.div`
  width: 100%;
`;
