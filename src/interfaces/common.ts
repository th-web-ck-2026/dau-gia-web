import { PropsWithChildren } from "react";

import { AxiosResponse } from "axios";

import { SortOrder } from "@/constants";

export type BaseParams = {
  page?: number;
  limit?: number;
  sortField?: string;
  sortBy?: keyof typeof SortOrder | null | string;
  pageSize?: number;
};

export type PropsWithChildrenType = PropsWithChildren;

export interface Pagination {
  page?: number;
  limit?: number;
  total?: number;
  lastPage?: number;
  pageSize?: number;
}

export interface Meta {
  totalItems?: number;
  itemsPerPage?: number;
  itemCount?: number;
  currentPage?: number;
  totalPages?: number;
}

export interface ResponseData<T> {
  data: T;
  items?: T;
  meta?: Meta;
  pagination?: Pagination;
  message?: string;
  status?: number;
  success?: boolean;
}

export interface ValidationError {
  detail: {
    [key: string]: {
      field: string;
      error: string;
      message: string;
      status: number;
      success: boolean;
    };
  };
}

export interface ServerError {
  error: string;
  message: string;
  status: number;
  success: boolean;
}

export type ApiError = AxiosResponse<ServerError | ValidationError>;

export interface ApiErrorData {
  status: number;
  data: ServerError | ValidationError;
  statusText: string;
  headers: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  config: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
