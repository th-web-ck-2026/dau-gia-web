import { SorterResult } from "antd/es/table/interface";

export const getSortValues = <T>(
  sorter: SorterResult<T> | SorterResult<T>[]
): { sortBy?: string; sortField?: string } => {
  if (!sorter || Array.isArray(sorter) || !sorter.order) {
    return { sortBy: undefined, sortField: undefined };
  }

  return {
    sortBy: sorter.order === "ascend" ? "ASC" : "DESC",
    sortField: sorter.field as string,
  };
};

export const getSortOrder = (
  field: string,
  sortField?: string,
  sortBy?: string
): "ascend" | "descend" | null => {
  if (sortField !== field || !sortBy) return null;
  return sortBy === "ASC" ? "ascend" : "descend";
};
