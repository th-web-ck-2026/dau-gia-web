import styled from "styled-components";

import { BaseButton } from "@/components/common";

export const BannerWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: 480px;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    height: 420px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    height: 380px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(26, 63, 117, 0.7);
      z-index: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    height: 340px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(26, 63, 117, 0.7);
      z-index: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    height: 300px;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100% !important;
    object-fit: cover;
    object-position: center;
  }
`;

export const BannerContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    width: 100%;
    padding: 0 24px;
  }

  .box-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 56px;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
      align-items: center;
      gap: 32px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
      gap: 24px;
    }

    .heading {
      color: ${({ theme }) => theme.white};
      font-size: ${({ theme }) => theme.fontSizes.xxxl};
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: center;

      @media (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
        font-size: ${({ theme }) => theme.fontSizes.xxl};
        gap: 16px;
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
        font-size: ${({ theme }) => theme.fontSizes.xl};
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        font-size: ${({ theme }) => theme.fontSizes.lg};
      }

      .title {
        font-weight: ${({ theme }) => theme.fontWeights.semibold};
        text-align: center;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
      }

      .slogan {
        display: flex;
        gap: 16px;
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        position: relative;
        text-transform: uppercase;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

        @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
          align-items: center;
          gap: 8px;
        }

        &::before {
          content: "";
          width: 80%;
          height: 2px;
          background-color: ${({ theme }) => theme.white};
          bottom: -10px;
          left: 50%;
          position: absolute;
          z-index: 10;
          transform: translateX(-50%);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
        }
      }
    }

    .box-action {
      display: flex;
      gap: 18px;
      width: 100%;
      align-items: center;
      justify-content: center;

      @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        flex-direction: column;
        gap: 12px;
      }
    }
  }
`;

export const Button = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.xxl};
  padding: 16px 40px;
  height: auto;
  max-height: 53px;
  width: 100%;
  max-width: 260px;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    padding: 12px 24px;
    font-size: ${({ theme }) => theme.fontSizes.md};
    max-height: 44px;
    max-width: 220px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    max-width: 100%;
  }

  &.ant-btn-primary {
    background-color: #80c5ed;
    border-color: #80c5ed;

    &:hover,
    :focus,
    :active {
      background-color: #6fbdebff !important;
      border-color: #6fbdebff !important;
    }
  }

  &.ant-btn-default {
    border-color: #80c5ed;
    background-color: transparent;
    transition: all 0.3s ease;

    &:hover {
      background-color: #80c5ed !important;
      color: ${({ theme }) => theme.white} !important;
      border: none !important;
    }

    &:focus,
    :active {
      background-color: #6fbdebff !important;
      border-color: #6fbdebff !important;
      color: ${({ theme }) => theme.white} !important;
    }
  }
`;
