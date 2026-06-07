"use client";

import { UseQueryOptions } from "@tanstack/react-query";

import { AdminStatsResponse, getAdminStats } from "@/api/admin";
import { useAppQuery } from "@/hooks/common";
import { ApiError } from "@/interfaces";
import { ResponseData } from "@/interfaces/common";

export const useGetAdminStats = (
  options?: Omit<
    UseQueryOptions<
      ResponseData<AdminStatsResponse>,
      ApiError,
      ResponseData<AdminStatsResponse>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useAppQuery({
    queryKey: ["useGetAdminStats"],
    queryFn: () => getAdminStats(),
    ...options,
  });
};
