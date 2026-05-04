import styled from "styled-components";

import { media } from "@/styles/theme.utils";

import { BaseInput } from "../../base-input";
import { BaseSpace } from "../../base-space";

export const SearchInput = styled(BaseInput.Search)`
  & .ant-input-prefix {
    margin: 0.5rem;
  }

  & .ant-input-search-button {
    padding: 0 0.75rem;
    box-shadow: none;
  }

  & input {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    background-color: ${({ theme }) => theme.backgroundColorBase};

    @media only screen and (${media("md")}) {
      font-size: 1rem;
    }

    &::placeholder {
      font-weight: 500;
    }
  }

  .ant-input-group-addon {
    min-width: auto;
    color: ${({ theme }) => theme.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  .ant-input-search-button,
  .ant-input-search-button:hover,
  .ant-input-search-button:focus,
  .ant-input-search-button:active {
    &.ant-btn {
      font-weight: ${({ theme }) => theme.fontWeights.regular};

      .anticon {
        color: ${({ theme }) => theme.primary};
      }
    }
    width: 100%;
    color: ${({ theme }) => theme.primary};
    box-shadow: none;
  }
`;

export const Space = styled(BaseSpace)`
  & > .ant-space-item:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
