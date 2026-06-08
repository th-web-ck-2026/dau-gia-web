import styled from "styled-components";

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.textMain || "#111827"};
  margin: 0;
`;

export const TimelineCard = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const PanelWrapper = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PanelTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  border-bottom: 1px solid #f3f4f6;
  padding-bottom: 12px;
`;

export const InfoCard = styled.div`
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  span:first-child {
    color: #4b5563;
  }

  span:last-child {
    font-weight: 500;
    color: #111827;
  }
`;

export const ChecklistRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #f3f4f6;
`;

export const BankInfoContainer = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const UploadBox = styled.div`
  border: 2px dashed #bfdbfe;
  padding: 24px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  background: #f8fafc;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1f3aa0;
    background: #eff6ff;
  }
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 240px;
  border-radius: 6px;
  object-fit: contain;
  margin-top: 12px;
  border: 1px solid #e5e7eb;
`;
