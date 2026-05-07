import {
  DefaultError,
  MutationFunction,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query";
import { FormInstance } from "antd";

import { useLoadServerError } from "./useLoadServerError";

export interface UseAppMutationOptions<TData, TError, TVariables, TContext>
  extends UseMutationOptions<TData, TError, TVariables, TContext> {
  form?: FormInstance;
}

export function useAppMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseAppMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { loadServerErrors } = useLoadServerError();

  const { form, onError, ...mutationOptions } = options || {};

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    ...mutationOptions,
    mutationFn,
    onError: (error, variables, context) => {
      // @ts-expect-error: TanStack Query v5 generic inference limitation when wrapping useMutation
      onError?.(error, variables, context);
      loadServerErrors({
        error: error as unknown as Error,
        form,
      });
    },
  });

  const safeMutate: UseMutationResult<
    TData,
    TError,
    TVariables,
    TContext
  >["mutate"] = (variables, mutateOptions) => {
    if (!mutation.isPending) {
      mutation.mutate(variables, mutateOptions);
    }
  };

  const safeMutateAsync: UseMutationResult<
    TData,
    TError,
    TVariables,
    TContext
  >["mutateAsync"] = (variables, mutateOptions) => {
    if (!mutation.isPending) {
      return mutation.mutateAsync(variables, mutateOptions);
    }
    return Promise.resolve() as any;
  };

  return {
    ...mutation,
    mutate: safeMutate,
    mutateAsync: safeMutateAsync,
  } as UseMutationResult<TData, TError, TVariables, TContext>;
}
