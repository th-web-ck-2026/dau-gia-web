import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.primary8 || "#172b70"};
  color: rgba(255, 255, 255, 0.85);
  font-family: ${({ theme }) =>
    theme.fontFamilies?.bePro || "var(--font-be-vietnam-pro)"};
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px 32px 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints?.md || 768}px) {
    padding: 40px 16px 24px 16px;
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const LogoSection = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  flex-direction: column;
  align-items: flex-start;

  svg {
    path {
      fill: ${({ theme }) => theme.white} !important;
    }
  }
`;

export const CompanyName = styled.h2`
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSizes?.md};
  font-weight: ${({ theme }) => theme.fontWeights?.bold};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Tagline = styled.p`
  color: rgba(255, 255, 255, 0.65);
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.875rem"};
  font-weight: ${({ theme }) => theme.fontWeights?.regular || 400};
  margin: 0;
`;

export const ColumnTitle = styled.h3`
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSizes?.sm};
  font-weight: ${({ theme }) => theme.fontWeights?.bold};
  margin: 0 0 20px 0;
  text-transform: uppercase;
  position: relative;
  letter-spacing: 0.5px;
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.875rem"};
  line-height: 1.5;

  svg {
    color: ${({ theme }) => theme.white};
    font-size: 16px;
    margin-top: 3px;
    flex-shrink: 0;
  }

  span {
    word-break: break-word;
  }
`;

export const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LinkItem = styled.div`
  a {
    color: rgba(255, 255, 255, 0.8);
    font-size: ${({ theme }) => theme.fontSizes?.xs || "0.875rem"};
    text-decoration: none;
    transition: all 0.2s ease;
    display: inline-block;

    &:hover {
      color: ${({ theme }) => theme.primary4 || "#7aa3ff"};
      transform: translateX(4px);
    }
  }
`;

export const SubscribeFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SubscribeDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${({ theme }) => theme.fontSizes?.xs || "0.875rem"};
  margin: 0;
  line-height: 1.5;
`;

export const SubscribeInputGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints?.xs || 480}px) {
    flex-direction: column;
    gap: 10px;
  }

  .ant-input {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: ${({ theme }) => theme.white};
    height: 40px;
    font-size: ${({ theme }) => theme.fontSizes?.xs};

    &::placeholder {
      color: rgba(255, 255, 255, 0.45);
    }

    &:focus,
    &:hover {
      border-color: ${({ theme }) => theme.primary5 || "#006AE9"};
      background-color: rgba(255, 255, 255, 0.15);
      box-shadow: none;
    }
  }

  .ant-btn {
    height: 40px;
    font-weight: ${({ theme }) => theme.fontWeights?.semibold};
    font-size: ${({ theme }) => theme.fontSizes?.xs};
    padding: 0 16px;
    background-color: ${({ theme }) => theme.primary5};
    border-color: ${({ theme }) => theme.primary5};
    color: ${({ theme }) => theme.white};

    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.primary2};
      color: ${({ theme }) => theme.white};
    }
  }
`;

export const FooterDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.12);
  margin: 40px 0 24px 0;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const BottomText = styled.p`
  color: rgba(255, 255, 255, 0.55);
  font-size: ${({ theme }) => theme.fontSizes?.xxs || "0.75rem"};
  line-height: 1.6;
  margin: 0;
`;

export const CopyrightText = styled(BottomText)`
  color: rgba(255, 255, 255, 0.45);
  margin-top: 8px;
`;
