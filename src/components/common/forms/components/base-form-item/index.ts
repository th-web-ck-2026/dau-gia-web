import React from "react";

import { Form, FormItemProps } from "antd";
import styled, { css } from "styled-components";

import { media } from "@/styles/theme.utils";

interface InternalFormItemProps {
  $isSuccess?: boolean;
  $successText?: string;
}

export type BaseFormItemProps = FormItemProps;

export const BaseFormItem = styled(
  Form.Item as React.FC<FormItemProps>
)<InternalFormItemProps>`
  margin-bottom: 0.75rem;

  :disabled {
    background-color: ${({ theme }) => theme.layoutBodyBg} !important;
    color: ${({ theme }) => theme.textQuaternary} !important;
    border: 1px solid ${({ theme }) => theme.border};
  }

  .ant-input {
    font-size: ${({ theme }) => theme.fontSizes.md};
    background: inherit;
    border-color: ${({ theme }) => theme.borderBase};

    &::placeholder {
      color: ${({ theme }) => theme.gray};
    }
  }

  .ant-input:focus {
    box-shadow: ${({ theme }) => theme.boxShadow};
    border-color: ${({ theme }) => theme.primary5};
  }

  .ant-input:disabled {
    color: ${({ theme }) => theme.disabled};
    background-color: ${({ theme }) => theme.disabledBg};
    cursor: not-allowed;
  }

  & .ant-form-item-control-input {
    min-height: 3rem;
  }

  .ant-form-item-label {
    padding-bottom: 0.25rem;
  }

  .ant-form-item-label > label {
    color: ${({ theme }) => theme.textTertiary};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: 1.25rem;

    .ant-form-item-optional {
      color: ${({ theme }) => theme.subText};
    }
  }

  .ant-form-item-label > label.ant-form-item-required::before {
    display: none;
  }

  .ant-form-item-label > label.ant-form-item-required::after {
    content: " *";
    color: ${({ theme }) => theme.error};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    line-height: 1.25rem;
    visibility: unset !important;
  }

  .ant-input-group-addon:first-of-type {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    width: 5rem;
    color: ${({ theme }) => theme.primary};

    .anticon,
    svg {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }

    @media only screen and (${media("md")}) {
      width: 5.5rem;
      font-size: ${({ theme }) => theme.fontSizes.lg};
    }

    @media only screen and (${media("xl")}) {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
    }
  }

  .ant-input-suffix .ant-btn {
    padding: 0;
    width: unset;
    height: unset;
    line-height: 1;
  }

  .ant-form-item-explain-error {
    display: flex;
    margin: 0.5rem 0;
    line-height: 1;
    font-size: ${({ theme }) => theme.fontSizes.xs};

    &:before {
      content: "X";
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      margin: 0 0.25rem;
      color: ${({ theme }) => theme.textSecondary};
      background: ${({ theme }) => theme.error};
      border-radius: 50%;
      width: 1rem;
      height: 1rem;
      font-size: 0.5rem;
    }

    &:not(:first-of-type) {
      display: none;
    }
  }

  ${(props) =>
    props.$isSuccess &&
    css`
      .ant-input {
        &,
        &:hover {
          border-color: ${({ theme }) => theme.success};
        }
      }

      .ant-form-item-control-input {
        display: block;

        &::after {
          content: "✓ ${props.$successText}";
          color: ${({ theme }) => theme.success};
        }
      }
    `}

  &.ant-form-item-has-feedback .ant-form-item-children-icon {
    display: none;
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }

  .ant-picker-suffix,
  .ant-select-arrow {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  .ant-select-arrow {
    width: unset;
    height: unset;
    top: 45%;
  }

  .ant-form-item-explain-error::before {
    display: none !important;
  }

  &.ant-form-item-has-error {
    .ant-input,
    .ant-input-affix-wrapper,
    .ant-input:hover,
    .ant-input-affix-wrapper:hover {
      border-color: ${({ theme }) => theme.error};
    }
  }

  &.ant-form-item-has-success.ant-form-item-has-feedback {
    .ant-input,
    .ant-input-affix-wrapper,
    .ant-input:hover,
    .ant-input-affix-wrapper:hover {
      border-color: ${({ theme }) => theme.success};
    }
  }

  & .ant-form-item-row {
    flex-wrap: inherit;
  }
`;
