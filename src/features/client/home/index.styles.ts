import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    gap: 2rem;
    padding-bottom: 2rem;
  }
`;

export const ContentWrapper = styled.section`
  padding: 0 42px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 0 24px;
  }
`;

export const ButtonsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  .ant-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &.ant-btn-default {
      border-color: ${({ theme }) => theme.backgroundBrand};
      color: ${({ theme }) => theme.backgroundBrand};

      &:hover,
      &:focus {
        border-color: ${({ theme }) => theme.backgroundBrand} !important;
        color: ${({ theme }) => theme.backgroundBrand} !important;
        opacity: 0.85;
      }
    }

    &.ant-btn-primary {
      background-color: ${({ theme }) => theme.backgroundBrand};
      border-color: ${({ theme }) => theme.backgroundBrand};
      color: ${({ theme }) => theme.white};

      &:hover,
      &:focus {
        background-color: ${({ theme }) => theme.backgroundBrand} !important;
        border-color: ${({ theme }) => theme.backgroundBrand} !important;
        opacity: 0.85;
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    flex-direction: column;
    align-items: center;

    .ant-btn {
      width: 100%;
      max-width: 250px;
    }
  }
`;

export const ErrorText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 2rem 0;
`;
