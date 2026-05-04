"use client";

import { css } from "styled-components";

export const resetCss = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    width: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.primary};
    border-radius: 1.25rem;
  }

  body {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  img {
    display: block;
  }
`;
