"use client";

import { useEffect } from "react";

import {
  QueryClient,
  QueryKey,
  QueryObserverResult,
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

import { ApiError, ApiErrorData } from "@/interfaces";

import { useLoadServerError } from "./useLoadServerError";

export type UseAppQueryResult<TData, TError> = Omit<
  UseQueryResult<TData, TError>,
  "refetch"
> & {
  refetch: (
    ...args: Parameters<UseQueryResult<TData, TError>["refetch"]>
  ) => Promise<QueryObserverResult<TData, TError> | void>;
};

const handledErrors = new WeakMap<object, boolean>();

export function useAppQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  queryClient?: QueryClient
): UseAppQueryResult<TData, TError> {
  const { loadServerErrors } = useLoadServerError();

  const query = useQuery(options, queryClient);

  const safeRefetch = (
    ...args: Parameters<UseQueryResult<TData, TError>["refetch"]>
  ): Promise<QueryObserverResult<TData, TError> | void> => {
    if (!query.isRefetching) {
      return query.refetch(...args);
    }

    return Promise.resolve();
  };

  useEffect(() => {
    if (query.isError && query.error) {
      const error = query.error as unknown as ApiError | ApiErrorData;

      if (!handledErrors.has(error)) {
        handledErrors.set(error, true);
        loadServerErrors({ error });
      }
    }
  }, [query.isError, query.error, loadServerErrors]);

  return { ...query, refetch: safeRefetch };
}
