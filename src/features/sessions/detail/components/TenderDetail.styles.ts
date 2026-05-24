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

export const ContentCard = styled.div`
  background: #ffffff;
  border: 1px solid #f3f4f6;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
`;

export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
`;

export const MetaItem = styled.div`
  background: #f9fafb;
  border: 1px solid #f3f4f6;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;

  .label {
    font-size: 0.8125rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
    display: block;
  }

  .value {
    font-size: 1.125rem;
    font-weight: 700;
    color: #111827;
  }

  .value.highlight {
    color: #2563eb;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f3f4f6;
`;

export const ScoreBreakdown = styled.div`
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
  border: 1px solid #a7f3d0;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-top: 1.5rem;

  .score-title {
    font-size: 1rem;
    font-weight: 700;
    color: #065f46;
    margin-bottom: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .score-item {
    background: rgba(255, 255, 255, 0.6);
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    text-align: center;
    border: 1px solid rgba(167, 243, 208, 0.5);

    .lbl {
      font-size: 0.75rem;
      color: #047857;
      display: block;
      margin-bottom: 0.25rem;
    }

    .val {
      font-size: 1.25rem;
      font-weight: 800;
      color: #065f46;
    }
  }
`;

export const FormLabel = styled.label`
  font-weight: 600;
  color: #374151;
  display: block;
  margin-bottom: 0.375rem;
  font-size: 0.875rem;

  span.required {
    color: #ef4444;
    margin-left: 0.25rem;
  }
`;

export const FormHelpText = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  display: block;
  margin-top: 0.25rem;
`;
