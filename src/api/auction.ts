import {
  AuctionSession,
  AuctionStatusResponse,
  CreateAuctionDTO,
  PlaceBidDTO,
  PlaceBidResponse,
} from "@/interfaces/auction";
import { ResponseData } from "@/interfaces/common";
import { request } from "@/services/axios";

export const getAuctions = (params?: any) =>
  request.get<any, ResponseData<AuctionSession[]>>("/auction-sessions", params);

export const getAuctionDetail = (id: string) =>
  request.get<undefined, ResponseData<AuctionSession>>(
    `/auction-sessions/${id}`
  );

export const createAuction = (data: CreateAuctionDTO) =>
  request.post<
    CreateAuctionDTO,
    ResponseData<{ _id: string; trangThai: string }>
  >("/auction-sessions", data);

export const placeBid = (id: string, data: PlaceBidDTO) =>
  request.post<PlaceBidDTO, ResponseData<PlaceBidResponse>>(
    `/auction-sessions/${id}/bids`,
    data
  );

export const getAuctionStatus = (id: string) =>
  request.get<undefined, ResponseData<AuctionStatusResponse>>(
    `/auction-sessions/${id}/status`,
    undefined,
    {
      _silent: true,
    }
  );

export const closeAuction = (id: string) =>
  request.post<undefined, ResponseData<any>>(`/auction-sessions/${id}/close`);
