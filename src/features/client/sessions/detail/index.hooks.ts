"use client";

import { UseQueryOptions } from "@tanstack/react-query";

import {
  getAuctionBids,
  getAuctionSessionDetail,
  getAuctionSessionRanking,
  getAuctionSessionStatus,
  getTenderSessionDetail,
  getTenderSessionRanking,
  getTenderSessionStatus,
  getTenderSubmissions,
  placeAuctionBid,
  submitTenderProposal,
} from "@/api/sessions";
import { LoaiPhien } from "@/constants/scoring";
import { useAppMutation, useAppQuery } from "@/hooks/common";
import { ApiError } from "@/interfaces";
import { ResponseData } from "@/interfaces/common";
import { TenderSubmission, UserBid } from "@/interfaces/sessions";

export const useSessionDetails = (
  id: string,
  type: LoaiPhien,
  options?: Omit<UseQueryOptions<any, ApiError, any>, "queryKey" | "queryFn">
) =>
  useAppQuery({
    queryKey: ["useSessionDetails", id, type],
    queryFn: () =>
      type === LoaiPhien.DAU_GIA
        ? getAuctionSessionDetail(id)
        : getTenderSessionDetail(id),
    ...options,
  });

export const useSessionStatus = (
  id: string,
  type: LoaiPhien,
  options?: Omit<UseQueryOptions<any, ApiError, any>, "queryKey" | "queryFn">
) =>
  useAppQuery({
    queryKey: ["useSessionStatus", id, type],
    queryFn: () =>
      type === LoaiPhien.DAU_GIA
        ? getAuctionSessionStatus(id)
        : getTenderSessionStatus(id),
    ...options,
  });

export const useSessionRanking = (
  id: string,
  type: LoaiPhien,
  options?: Omit<UseQueryOptions<any, ApiError, any>, "queryKey" | "queryFn">
) =>
  useAppQuery({
    queryKey: ["useSessionRanking", id, type],
    queryFn: () =>
      type === LoaiPhien.DAU_GIA
        ? getAuctionSessionRanking(id)
        : getTenderSessionRanking(id),
    ...options,
  });

export const useSessionBids = (
  id: string,
  options?: Omit<
    UseQueryOptions<ResponseData<UserBid[]>, ApiError, ResponseData<UserBid[]>>,
    "queryKey" | "queryFn"
  >
) =>
  useAppQuery({
    queryKey: ["useSessionBids", id],
    queryFn: () => getAuctionBids(id),
    ...options,
  });

export const useTenderSubmissions = (
  id: string,
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
    queryKey: ["useTenderSubmissions", id],
    queryFn: () => getTenderSubmissions(id),
    ...options,
  });

export const usePlaceBid = (id: string, options?: any) =>
  useAppMutation(
    (data: { giaDat: number }) => placeAuctionBid(id, data),
    options
  );

export const useSubmitProposal = (id: string, options?: any) =>
  useAppMutation(
    (data: {
      giaDeXuat: number;
      giaTriTieuChi: Array<{ tieuChiId: string; giaTriGoc: any }>;
    }) => submitTenderProposal(id, data),
    options
  );
