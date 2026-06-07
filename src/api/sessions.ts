import { SortOrder } from "@/constants";
import { TrangThaiPhien } from "@/constants";
import { ResponseData } from "@/interfaces/common";
import type {
  AuctionSession,
  CreateAuctionSessionDto,
  CreateTenderSessionDto,
  KeyAssetItem,
  PageableResponse,
  TenderSession,
  TenderSubmission,
  UserBid,
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

export const getAuctionSessionsMe = (params?: SessionQueryParams) =>
  request.get<
    SessionQueryParams,
    ResponseData<PageableResponse<AuctionSession>>
  >("/auction-sessions/me", params);

export const getTenderSessions = (params?: SessionQueryParams) =>
  request.get<
    SessionQueryParams,
    ResponseData<PageableResponse<TenderSession>>
  >("/tender-sessions", params);

export const getTenderSessionsMe = (params?: SessionQueryParams) =>
  request.get<
    SessionQueryParams,
    ResponseData<PageableResponse<TenderSession>>
  >("/tender-sessions/me", params);

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

export const createAuctionSession = (data: CreateAuctionSessionDto) =>
  request.post<CreateAuctionSessionDto, ResponseData<AuctionSession>>(
    "/auction-sessions",
    data
  );

export const createTenderSession = (data: CreateTenderSessionDto) =>
  request.post<CreateTenderSessionDto, ResponseData<TenderSession>>(
    "/tender-sessions",
    data
  );

export const publishAuctionSession = (id: string) =>
  request.post<void, ResponseData<AuctionSession>>(
    `/auction-sessions/${id}/publish`
  );

export const publishTenderSession = (id: string) =>
  request.post<void, ResponseData<TenderSession>>(
    `/tender-sessions/${id}/publish`
  );

export const closeAuctionSession = (id: string) =>
  request.post<void, ResponseData<AuctionSession>>(
    `/auction-sessions/${id}/close`
  );

export const closeTenderSession = ({
  id,
  winnerSubmissionId,
}: {
  id: string;
  winnerSubmissionId?: string;
}) =>
  request.post<{ winnerSubmissionId?: string }, ResponseData<TenderSession>>(
    `/tender-sessions/${id}/close`,
    { winnerSubmissionId }
  );

export const getAuctionBids = (id: string) =>
  request.get<void, ResponseData<UserBid[]>>(`/auction-sessions/${id}/bids`);

export const getTenderSubmissions = (id: string) =>
  request.get<void, ResponseData<TenderSubmission[]>>(
    `/tender-sessions/${id}/submissions`
  );

export const getAuctionSessionMeDetail = (id: string) =>
  request.get<void, ResponseData<AuctionSession>>(`/auction-sessions/me/${id}`);

export const getTenderSessionMeDetail = (id: string) =>
  request.get<void, ResponseData<TenderSession>>(`/tender-sessions/me/${id}`);

export const updateAuctionSessionMe = (
  id: string,
  data: Partial<CreateAuctionSessionDto>
) =>
  request.put<Partial<CreateAuctionSessionDto>, ResponseData<AuctionSession>>(
    `/auction-sessions/me/${id}`,
    data
  );

export const updateTenderSessionMe = (
  id: string,
  data: Partial<CreateTenderSessionDto>
) =>
  request.put<Partial<CreateTenderSessionDto>, ResponseData<TenderSession>>(
    `/tender-sessions/me/${id}`,
    data
  );

export const deleteAuctionSessionMe = (id: string) =>
  request.delete<void, ResponseData<{ success: boolean }>>(
    `/auction-sessions/me/${id}`
  );

export const deleteTenderSessionMe = (id: string) =>
  request.delete<void, ResponseData<{ success: boolean }>>(
    `/tender-sessions/me/${id}`
  );
