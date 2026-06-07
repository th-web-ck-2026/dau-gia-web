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

export const getAuctionSessionDetail = (id: string) =>
  request.get<void, ResponseData<AuctionSession>>(`/auction-sessions/${id}`);

export const getTenderSessionDetail = (id: string) =>
  request.get<void, ResponseData<TenderSession>>(`/tender-sessions/${id}`);

export const getAuctionSessionStatus = (id: string) =>
  request.get<
    void,
    ResponseData<{
      trangThai: TrangThaiPhien;
      tongSoLuotDat: number;
      giaHienTai: number;
      thoiGianServer: string;
      bietDanhNguoiDanDau?: string;
    }>
  >(`/auction-sessions/${id}/status`);

export const getTenderSessionStatus = (id: string) =>
  request.get<
    void,
    ResponseData<{
      phienDauThauId: string;
      trangThai: TrangThaiPhien;
      tongSoLuotDat: number;
      soLuongNguoiThamGia: number;
      thoiGianServer: string;
      thoiGianKetThuc: string;
    }>
  >(`/tender-sessions/${id}/status`);

export const getAuctionSessionRanking = (id: string) =>
  request.get<
    void,
    ResponseData<{
      phienId: string;
      trangThai: TrangThaiPhien;
      danhSach: any[];
    }>
  >(`/auction-sessions/${id}/ranking`);

export const getTenderSessionRanking = (id: string) =>
  request.get<
    void,
    ResponseData<{
      phienId: string;
      trangThai: TrangThaiPhien;
      danhSach: any[];
    }>
  >(`/tender-sessions/${id}/ranking`);

export const placeAuctionBid = (id: string, data: { giaDat: number }) =>
  request.post<{ phienId: string; giaDat: number }, ResponseData<any>>(
    `/auction-sessions/${id}/bids`,
    { phienId: id, ...data }
  );

export const submitTenderProposal = (
  id: string,
  data: {
    giaDeXuat: number;
    giaTriTieuChi: Array<{ tieuChiId: string; giaTriGoc: any }>;
  }
) =>
  request.post<any, ResponseData<any>>(`/tender-sessions/${id}/submissions`, {
    phienId: id,
    ...data,
  });
