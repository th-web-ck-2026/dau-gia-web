import { DatePickerProps } from "antd";

import * as S from "./index.styles";

export type BaseDatePickerProps = DatePickerProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const BaseDatePicker = S.DatePicker as any;

BaseDatePicker.RangePicker = S.RangePicker;
BaseDatePicker.TimePicker = S.TimePicker;
