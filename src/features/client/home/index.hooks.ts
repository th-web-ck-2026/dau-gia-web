"use client";

import { UseQueryOptions } from "@tanstack/react-query";

import {
  SessionQueryParams,
  getAuctionSessions,
  getTenderSessions,
} from "@/api/sessions";
import { useAppQuery } from "@/hooks/common";
import { ApiError } from "@/interfaces";
import { ResponseData } from "@/interfaces/common";
import {
  AuctionSession,
  PageableResponse,
  TenderSession,
} from "@/interfaces/sessions";

export const useGetAuctions = (
  params?: SessionQueryParams,
  options?: Omit<
    UseQueryOptions<
      ResponseData<PageableResponse<AuctionSession>>,
      ApiError,
      ResponseData<PageableResponse<AuctionSession>>
    >,
    "queryKey" | "queryFn"
  >
) =>
  useAppQuery({
    queryKey: ["useGetAuctions", params],
    queryFn: () => getAuctionSessions(params),
    ...options,
  });

export const useGetTenders = (
  params?: SessionQueryParams,
  options?: Omit<
    UseQueryOptions<
      ResponseData<PageableResponse<TenderSession>>,
      ApiError,
      ResponseData<PageableResponse<TenderSession>>
    >,
    "queryKey" | "queryFn"
  >
) =>
  useAppQuery({
    queryKey: ["useGetTenders", params],
    queryFn: () => getTenderSessions(params),
    ...options,
  });
