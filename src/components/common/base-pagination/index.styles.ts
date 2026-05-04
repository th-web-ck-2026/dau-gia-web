import { Pagination as AntdPagination } from "antd";
import styled, { css } from "styled-components";

export const Pagination = styled(AntdPagination)`
  ${(props) =>
    !props.disabled &&
    css`
      display: flex;
      gap: 8px;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;

      .ant-pagination-item,
      .ant-pagination-prev,
      .ant-pagination-next {
        border: none !important;
        background: transparent !important;
        transition: all 0.3s;

        a,
        .ant-pagination-item-link {
          border: 1px solid ${({ theme }) => theme.borderPagination} !important;
          border-radius: 8px !important;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100% !important;
          transition: all 0.3s;
          color: ${({ theme }) => theme.black};
          font-weight: ${({ theme }) => theme.fontWeights.medium};
          background-color: ${({ theme }) => theme.white};
        }

        &:not(.ant-pagination-disabled):hover {
          a,
          .ant-pagination-item-link {
            background-color: ${({ theme }) => theme.primary} !important;
            border-color: ${({ theme }) => theme.primary} !important;
            color: ${({ theme }) => theme.white} !important;
          }
        }
      }

      .ant-pagination-item-active {
        a {
          background-color: ${({ theme }) => theme.textBrand} !important;
          border-color: ${({ theme }) => theme.textBrand} !important;
          color: ${({ theme }) => theme.white} !important;
          font-weight: ${({ theme }) => theme.fontWeights.bold};
        }
      }

      .ant-pagination-next {
        .ant-pagination-item-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
      }

      .ant-pagination-jump-prev,
      .ant-pagination-jump-next {
        pointer-events: none;
        cursor: default;

        .ant-pagination-item-link-icon {
          display: none !important;
        }

        .ant-pagination-item-ellipsis {
          display: inline !important;
        }
      }
    `}

`;
