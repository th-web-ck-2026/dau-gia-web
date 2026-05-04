import styled from "styled-components";

export const DemoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2.5rem 3rem;
  color: #2d3436;
`;

export const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2d3436;
  border-bottom: 2px solid #dfe6e9;
  padding-bottom: 0.75rem;
  letter-spacing: -0.5px;
`;

export const SectionTitle = styled.h2`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 2rem 0 0.75rem;
  color: #636e72;
  padding: 0.5rem 0.75rem;
  background: #eef1f6;
  border-left: 3px solid #74b9ff;
  border-radius: 0 6px 6px 0;
`;

export const DemoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const DemoBlock = styled.div`
  margin-bottom: 1rem;
  padding: 1.25rem;
  background: #ffffff;
  border: 1px solid #e8ecf1;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const Label = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #95a5a6;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  display: block;
  margin-bottom: 0.5rem;
`;

export const ResponsiveInfo = styled.div`
  padding: 0.75rem 1rem;
  background: #ffffff;
  border: 1px solid #e8ecf1;
  border-radius: 10px;
  font-size: 0.8125rem;
  color: #636e72;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;
