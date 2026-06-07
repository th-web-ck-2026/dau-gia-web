"use client";

import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

import {
  AdminUserPageParams,
  AdminUserRow,
  UpdateUserAdminPayload,
  getAdminUserPage,
  updateUserByAdmin,
} from "@/api/admin";
import { useAppMutation, useAppQuery } from "@/hooks/common";
import { ApiError } from "@/interfaces";
import { ResponseData } from "@/interfaces/common";
import { PageableResponse } from "@/interfaces/sessions";

export const useGetAdminUserPage = (
  params?: AdminUserPageParams,
  options?: Omit<
    UseQueryOptions<
      ResponseData<PageableResponse<AdminUserRow>>,
      ApiError,
      ResponseData<PageableResponse<AdminUserRow>>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useAppQuery({
    queryKey: ["useGetAdminUserPage", params],
    queryFn: () => getAdminUserPage(params),
    ...options,
  });
};

export const useUpdateUserByAdmin = (
  options?: Omit<
    UseMutationOptions<
      ResponseData<AdminUserRow>,
      ApiError,
      { id: string; data: UpdateUserAdminPayload }
    >,
    "mutationFn"
  >
) => {
  return useAppMutation(
    ({ id, data }: { id: string; data: UpdateUserAdminPayload }) =>
      updateUserByAdmin(id, data),
    options
  );
};
