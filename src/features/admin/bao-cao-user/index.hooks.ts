"use client";

import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

import {
  AdminReportPageParams,
  AdminReportRow,
  ReplyReportPayload,
  getAdminReportDetail,
  getAdminReports,
  replyAdminReport,
} from "@/api/admin";
import { useAppMutation, useAppQuery } from "@/hooks/common";
import { ApiError } from "@/interfaces";
import { ResponseData } from "@/interfaces/common";
import { PageableResponse } from "@/interfaces/sessions";

export const useGetAdminReports = (
  params?: AdminReportPageParams,
  options?: Omit<
    UseQueryOptions<
      ResponseData<PageableResponse<AdminReportRow>>,
      ApiError,
      ResponseData<PageableResponse<AdminReportRow>>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useAppQuery({
    queryKey: ["useGetAdminReports", params],
    queryFn: () => getAdminReports(params),
    ...options,
  });
};

export const useGetAdminReportDetail = (
  id: string,
  options?: Omit<
    UseQueryOptions<
      ResponseData<AdminReportRow>,
      ApiError,
      ResponseData<AdminReportRow>
    >,
    "queryKey" | "queryFn"
  >
) => {
  return useAppQuery({
    queryKey: ["useGetAdminReportDetail", id],
    queryFn: () => getAdminReportDetail(id),
    enabled: !!id,
    ...options,
  });
};

export const useReplyAdminReport = (
  options?: Omit<
    UseMutationOptions<
      ResponseData<AdminReportRow>,
      ApiError,
      { id: string; data: ReplyReportPayload }
    >,
    "mutationFn"
  >
) =>
  useAppMutation(
    ({ id, data }: { id: string; data: ReplyReportPayload }) =>
      replyAdminReport(id, data),
    options
  );
