import styled from "styled-components";

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: var(--font-inter), sans-serif;
`;

export const BackButtonRow = styled.div`
  margin-bottom: 1.5rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const MainPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InfoCard = styled.div`
  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  color: #4b5563;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const CountdownRow = styled.div<{ $isUrgent?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: ${(props) =>
    props.$isUrgent
      ? "linear-gradient(90deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.03) 100%)"
      : "linear-gradient(90deg, #f3f4f6 0%, #f9fafb 100%)"};
  border: 1px solid
    ${(props) => (props.$isUrgent ? "rgba(239, 68, 68, 0.2)" : "#e5e7eb")};
  border-radius: 0.75rem;
  color: ${(props) => (props.$isUrgent ? "#ef4444" : "#1f2937")};
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 1.5rem;

  .clock-icon {
    font-size: 1.25rem;
  }

  .time-text {
    font-family: monospace;
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

export const StatBox = styled.div`
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 0.75rem;
  padding: 1.25rem;

  .label {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.375rem;
    display: block;
  }

  .value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
  }

  .value.highlight {
    color: #2563eb;
  }
`;

export const BiddingCard = styled.div`
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 2px solid #3b82f6;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.06);
`;

export const BidInputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const NextValidTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background: rgba(59, 130, 246, 0.08);
  color: #2563eb;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px dashed rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.12);
    border-color: #2563eb;
  }
`;

export const TableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  .table-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const AnimatedTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.875rem 1rem;
    text-align: left;
    border-bottom: 1px solid #f3f4f6;
    font-size: 0.875rem;
  }

  th {
    font-weight: 600;
    color: #4b5563;
    background: #f9fafb;
  }

  tbody tr {
    transition: background-color 0.2s ease;
  }

  tbody tr.you-row {
    background-color: rgba(59, 130, 246, 0.04);
  }

  tbody tr.leader-row {
    background-color: rgba(16, 185, 129, 0.04);
  }
`;

export const ClosedBanner = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.1);

  .closed-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .winner-info {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    opacity: 0.95;
  }
`;
