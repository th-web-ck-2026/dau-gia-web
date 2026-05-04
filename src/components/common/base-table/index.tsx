import React from "react";

import { TableProps } from "antd";

import * as S from "./index.styles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<PropertyKey, any>;

export type BaseTableProps<T extends AnyRecord> = TableProps<T>;

export const BaseTable = <T extends AnyRecord>(
  props: BaseTableProps<T>
): React.JSX.Element => {
  return <S.Table {...props} />;
};
