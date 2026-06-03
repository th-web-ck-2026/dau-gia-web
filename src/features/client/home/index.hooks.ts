"use client";

import {
  SessionQueryParams,
  getAuctionSessions,
  getKeyAssets,
  getTenderSessions,
} from "@/api/sessions";
import { useAppQuery } from "@/hooks/common";

export const useGetAuctions = (params?: SessionQueryParams) =>
  useAppQuery({
    queryKey: ["useGetAuctions", params],
    queryFn: () => getAuctionSessions(params),
  });

export const useGetTenders = (params?: SessionQueryParams) =>
  useAppQuery({
    queryKey: ["useGetTenders", params],
    queryFn: () => getTenderSessions(params),
  });

export const useGetKeyAssets = (params?: SessionQueryParams) =>
  useAppQuery({
    queryKey: ["useGetKeyAssets", params],
    queryFn: () => getKeyAssets(params),
  });
