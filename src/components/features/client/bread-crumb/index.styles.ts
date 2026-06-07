import styled from "styled-components";

export const BreadCrumbWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 80px;
  background-color: ${({ theme }) => theme.backgroundSecondary};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg - 1}px) {
    padding: 0 16px;
  }
`;

export const BreadCrumbInner = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 52px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg - 1}px) {
    height: 36px;
  }
`;
