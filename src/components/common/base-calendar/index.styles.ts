import { Calendar as AntCalendar } from "antd";
import styled from "styled-components";

export const Calendar = styled(AntCalendar)`
  .ant-picker-cell-in-view .ant-picker-calendar-date-value {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;
