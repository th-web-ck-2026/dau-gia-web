import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: ${({ theme }) => theme.background || "#ffffff"};
  border-bottom: 1px solid ${({ theme }) => theme.border || "#e5e7eb"};
  box-shadow: ${({ theme }) =>
    theme.boxShadow || "0 2px 8px 0 rgba(0, 0, 0, 0.07)"};
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.lg || "1.125rem"};
  font-weight: ${({ theme }) => theme.fontWeights.semibold || "600"};
  color: ${({ theme }) => theme.textMain || "#000000"};
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
