import styled from "styled-components";

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.25rem 1.5rem;
  font-family: var(--font-inter), sans-serif;
`;

export const HeaderSection = styled.div`
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  color: #ffffff;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #60a5fa, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

export const Subtitle = styled.p`
  color: #9ca3af;
  font-size: 1rem;
  margin: 0;
`;

export const FilterBox = styled.div`
  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const CardWrapper = styled.div`
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  height: 100%;

  .ant-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid #f3f4f6;

    .ant-card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1.25rem;
    }
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.08);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const CountdownContainer = styled.div<{ $isUrgent?: boolean }>`
  background: ${(props) =>
    props.$isUrgent ? "rgba(239, 68, 68, 0.08)" : "#f3f4f6"};
  border-radius: 0.5rem;
  padding: 0.625rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => (props.$isUrgent ? "#ef4444" : "#4b5563")};
  margin-bottom: 1.25rem;
  border: 1px solid
    ${(props) => (props.$isUrgent ? "rgba(239, 68, 68, 0.2)" : "transparent")};

  span {
    font-family: monospace;
    font-size: 0.9375rem;
    font-weight: 600;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;

  .label {
    color: #6b7280;
  }

  .value {
    color: #111827;
    font-weight: 600;
  }

  .value.price {
    color: #2563eb;
    font-size: 1rem;
  }
`;

export const FooterAction = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  justify-content: flex-end;
`;
