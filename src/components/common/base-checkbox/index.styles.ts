import { Checkbox as AntdCheckbox } from "antd";
import styled from "styled-components";

export const Checkbox = styled(AntdCheckbox)`
  & .ant-checkbox-inner::after {
    border-width: 2.1px;
  }
`;

export const CheckboxGroup = styled(AntdCheckbox.Group)`
  .ant-form-vertical &.ant-checkbox-group {
    display: inline-block;
  }
`;

