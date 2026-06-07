"use client";

import React from "react";

import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
`;

const Shimmer = styled.div<{ $radius?: string }>`
  background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 37%, #f0f0f0 63%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.4s ease infinite;
  border-radius: ${({ $radius }) => $radius ?? "12px"};
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 7.5fr) minmax(0, 4.5fr);
  gap: 2rem;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-width: 0;
  width: 100%;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
  width: 100%;
`;

const SessionDetailSkeleton: React.FC = () => (
  <Grid>
    <LeftCol>
      <Shimmer style={{ height: 340 }} />
      <Shimmer style={{ height: 300 }} />
      <Shimmer style={{ height: 240 }} />
    </LeftCol>

    <RightCol>
      <Shimmer style={{ height: 280 }} />
      <Shimmer style={{ height: 160 }} />
      <Shimmer style={{ height: 180 }} />
    </RightCol>
  </Grid>
);

export default SessionDetailSkeleton;
