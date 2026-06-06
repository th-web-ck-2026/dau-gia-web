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

export const useGetSessionsAuction = (
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
    queryKey: ["useGetSessionsAuction", params],
    queryFn: () => getAuctionSessions(params),
    ...options,
  });

export const useGetSessionsTender = (
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
    queryKey: ["useGetSessionsTender", params],
    queryFn: () => getTenderSessions(params),
    ...options,
  });
