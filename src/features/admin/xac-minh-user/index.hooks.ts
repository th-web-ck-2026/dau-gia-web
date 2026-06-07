"use client";

import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

import {
  AdminDuyetPayload,
  AdminXacMinhQueryParams,
  AdminXacMinhUserData,
  adminDuyetDonXacMinh,
  getAdminXacMinhUsers,
} from "@/api/admin";
import { useAppMutation, useAppQuery } from "@/hooks/common";
import { ApiError } from "@/interfaces";
import { ResponseData } from "@/interfaces/common";
import { PageableResponse } from "@/interfaces/sessions";

export const useGetAdminXacMinhUsers = (
  params?: AdminXacMinhQueryParams,
  options?: Omit<
    UseQueryOptions<
      ResponseData<PageableResponse<AdminXacMinhUserData>>,
      ApiError,
      ResponseData<PageableResponse<AdminXacMinhUserData>>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useAppQuery({
    queryKey: ["useGetAdminXacMinhUsers", params],
    queryFn: () => getAdminXacMinhUsers(params),
    ...options,
  });
};

export const useAdminDuyetDonXacMinh = (
  options?: Omit<
    UseMutationOptions<
      ResponseData<AdminXacMinhUserData>,
      ApiError,
      { id: string; data: AdminDuyetPayload }
    >,
    "mutationFn"
  >
) =>
  useAppMutation(
    ({ id, data }: { id: string; data: AdminDuyetPayload }) =>
      adminDuyetDonXacMinh(id, data),
    options
  );
