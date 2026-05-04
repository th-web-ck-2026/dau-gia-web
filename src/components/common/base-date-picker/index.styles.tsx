import { DatePicker as AntDatePicker } from "antd";
import styled, { css } from "styled-components";

const datePickerSizes = css`
  &.ant-picker {
    &.ant-picker-small {
      padding: 3.1px 7px;
    }
    &.ant-picker-large {
      padding: 17.6px 11px;
    }
    &.ant-picker-outlined.ant-picker-disabled {
      background-color: ${({ theme }) => theme.layoutBodyBg};
    }
  }
`;

export const DatePicker = styled(AntDatePicker)`
  ${datePickerSizes}
`;

export const RangePicker = styled(AntDatePicker.RangePicker)`
  ${datePickerSizes}
`;

export const TimePicker = styled(AntDatePicker.TimePicker)`
  ${datePickerSizes}
`;
