import { Breadcrumb as AntBreadcrumb } from "antd";
import styled from "styled-components";

export const Breadcrumb = styled(AntBreadcrumb)`
  .ant-breadcrumb-link {
    a {
      transition: color 0.2s;

      &:focus,
      &:focus-visible {
        outline: none;
      }
    }
  }

  // Ensure last item's hover & focus uses theme.primary
  li:last-child {
    .ant-breadcrumb-link {
      a {
        &:hover,
        &:focus,
        &:focus-visible {
          color: ${({ theme }) => theme.primary} !important;
        }
      }

      // If it's a non-link element (just text) but focuses/hovers
      &:hover,
      &:focus,
      &:focus-visible {
        color: ${({ theme }) => theme.primary} !important;
      }
    }
  }

  // Normal items hover & focus uses theme.breadcrumb
  li:not(:last-child) {
    .ant-breadcrumb-link {
      a {
        &:hover,
        &:focus,
        &:focus-visible {
          color: ${({ theme }) => theme.breadcrumb} !important;
        }
      }
    }
  }
`;
