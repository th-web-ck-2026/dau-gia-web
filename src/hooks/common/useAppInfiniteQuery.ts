import { useMemo } from "react";

import {
  QueryClient,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { ApiError, ApiErrorData } from "@/interfaces";

import { useLoadServerError } from "./useLoadServerError";

const handledErrors = new WeakMap<object, boolean>();

export function useAppInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >,
  queryClient?: QueryClient
) {
  const { loadServerErrors } = useLoadServerError();

  const query = useInfiniteQuery(options, queryClient);

  useMemo(() => {
    if (query.isError && query.error) {
      const error = query.error as unknown as ApiError | ApiErrorData;

      if (!handledErrors.has(error)) {
        handledErrors.set(error, true);
        loadServerErrors({ error });
      }
    }
  }, [query.isError, query.error, loadServerErrors]);

  return query;
}
