import React from "react";

import styled from "styled-components";

import { BaseSpin, BaseSpinProps } from "../base-spin";

export const BaseLoading: React.FC<BaseSpinProps> = (props: BaseSpinProps) => {
  return (
    <SpinnerContainer>
      <BaseSpin {...props} />
    </SpinnerContainer>
  );
};

const SpinnerContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
