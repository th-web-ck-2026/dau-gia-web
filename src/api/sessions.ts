import { SortOrder } from "@/constants";
import { TrangThaiPhien } from "@/constants";
import { ResponseData } from "@/interfaces/common";
import type {
  AuctionSession,
  KeyAssetItem,
  PageableResponse,
  TenderSession,
} from "@/interfaces/sessions";
import { request } from "@/services/axios";

export interface SessionQueryParams {
  condition?: {
    trangThai?: TrangThaiPhien;
    _id?: string;
    chuPhienId?: string;
  };
  page?: number;
  limit?: number;
  order?: {
    createdAt?: SortOrder;
  };
}

export const getAuctionSessions = (params?: SessionQueryParams) =>
  request.get<
    SessionQueryParams,
    ResponseData<PageableResponse<AuctionSession>>
  >("/auction-sessions", params);

export const getTenderSessions = (params?: SessionQueryParams) =>
  request.get<
    SessionQueryParams,
    ResponseData<PageableResponse<TenderSession>>
  >("/tender-sessions", params);

export const getKeyAssets = async (
  _params?: SessionQueryParams
): Promise<ResponseData<PageableResponse<KeyAssetItem>>> => {
  return {
    success: true,
    statusCode: 200,
    data: {
      page: 1,
      offset: 0,
      limit: 3,
      total: 0,
      result: [],
    },
  };
};
