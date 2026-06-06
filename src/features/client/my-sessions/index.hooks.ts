"use client";

import { UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";

import {
  SessionQueryParams,
  closeAuctionSession,
  closeTenderSession,
  createAuctionSession,
  createTenderSession,
  getAuctionBids,
  getAuctionSessions,
  getTenderSessions,
  getTenderSubmissions,
  publishAuctionSession,
  publishTenderSession,
} from "@/api/sessions";
import { useAppMutation, useAppQuery } from "@/hooks/common";
import { ApiError } from "@/interfaces";
import { ResponseData } from "@/interfaces/common";
import {
  AuctionSession,
  CreateAuctionSessionDto,
  CreateTenderSessionDto,
  PageableResponse,
  TenderSession,
  TenderSubmission,
  UserBid,
} from "@/interfaces/sessions";

export const useGetMyAuctionSessions = (
  userId: string,
  params?: SessionQueryParams,
  options?: Omit<
    UseQueryOptions<
      ResponseData<PageableResponse<AuctionSession>>,
      ApiError,
      ResponseData<PageableResponse<AuctionSession>>
    >,
    "queryKey" | "queryFn"
  >
) => {
  const queryParams = {
    ...params,
    condition: {
      ...params?.condition,
      chuPhienId: userId,
    },
  };

  return useAppQuery({
    queryKey: ["useGetMyAuctionSessions", queryParams],
    queryFn: () => getAuctionSessions(queryParams),
    enabled: !!userId,
    ...options,
  });
};

export const useGetMyTenderSessions = (
  userId: string,
  params?: SessionQueryParams,
  options?: Omit<
    UseQueryOptions<
      ResponseData<PageableResponse<TenderSession>>,
      ApiError,
      ResponseData<PageableResponse<TenderSession>>
    >,
    "queryKey" | "queryFn"
  >
) => {
  const queryParams = {
    ...params,
    condition: {
      ...params?.condition,
      chuPhienId: userId,
    },
  };

  return useAppQuery({
    queryKey: ["useGetMyTenderSessions", queryParams],
    queryFn: () => getTenderSessions(queryParams),
    enabled: !!userId,
    ...options,
  });
};

export const useCreateAuctionSession = (
  options?: Omit<
    UseMutationOptions<
      ResponseData<AuctionSession>,
      ApiError,
      CreateAuctionSessionDto
    >,
    "mutationFn"
  >
) => useAppMutation(createAuctionSession, options);

export const useCreateTenderSession = (
  options?: Omit<
    UseMutationOptions<
      ResponseData<TenderSession>,
      ApiError,
      CreateTenderSessionDto
    >,
    "mutationFn"
  >
) => useAppMutation(createTenderSession, options);

export const usePublishAuctionSession = (
  options?: Omit<
    UseMutationOptions<ResponseData<AuctionSession>, ApiError, string>,
    "mutationFn"
  >
) => useAppMutation(publishAuctionSession, options);

export const usePublishTenderSession = (
  options?: Omit<
    UseMutationOptions<ResponseData<TenderSession>, ApiError, string>,
    "mutationFn"
  >
) => useAppMutation(publishTenderSession, options);

export const useCloseAuctionSession = (
  options?: Omit<
    UseMutationOptions<ResponseData<AuctionSession>, ApiError, string>,
    "mutationFn"
  >
) => useAppMutation(closeAuctionSession, options);

export const useCloseTenderSession = (
  options?: Omit<
    UseMutationOptions<
      ResponseData<TenderSession>,
      ApiError,
      { id: string; winnerSubmissionId?: string }
    >,
    "mutationFn"
  >
) => useAppMutation(closeTenderSession, options);

export const useGetAuctionBids = (
  sessionId: string,
  options?: Omit<
    UseQueryOptions<ResponseData<UserBid[]>, ApiError, ResponseData<UserBid[]>>,
    "queryKey" | "queryFn"
  >
) =>
  useAppQuery({
    queryKey: ["useGetAuctionBids", sessionId],
    queryFn: () => getAuctionBids(sessionId),
    enabled: !!sessionId,
    ...options,
  });

export const useGetTenderSubmissions = (
  sessionId: string,
  options?: Omit<
    UseQueryOptions<
      ResponseData<TenderSubmission[]>,
      ApiError,
      ResponseData<TenderSubmission[]>
    >,
    "queryKey" | "queryFn"
  >
) =>
  useAppQuery({
    queryKey: ["useGetTenderSubmissions", sessionId],
    queryFn: () => getTenderSubmissions(sessionId),
    enabled: !!sessionId,
    ...options,
  });
