import {
  DefaultError,
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FormInstance } from "antd";

import { useLoadServerError } from "./useLoadServerError";

export interface AppMutationOptions {
  form?: FormInstance;
}

export interface UseAppMutationProps<TData, TError, TVariables, TContext> {
  useAppMutationProps?: AppMutationOptions;
  queryOptions?: UseMutationOptions<TData, TError, TVariables, TContext>;
}

type MutationOnError<TData, TError, TVariables, TContext> = NonNullable<
  UseMutationOptions<TData, TError, TVariables, TContext>["onError"]
>;

export function useAppMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  props?: UseAppMutationProps<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { loadServerErrors } = useLoadServerError();
  const handleError: MutationOnError<TData, TError, TVariables, TContext> = (
    ...args
  ) => {
    const [error] = args;
    props?.queryOptions?.onError?.(...args);
    loadServerErrors({
      error,
      ...props?.useAppMutationProps,
    });
  };

  const mutation = useMutation({
    ...props?.queryOptions,
    mutationFn,
    onError: handleError,
  });

  const safeMutate = (...args: Parameters<typeof mutation.mutate>) => {
    if (!mutation.isPending) {
      return mutation.mutate(...args);
    }
  };

  return { ...mutation, mutate: safeMutate };
}
