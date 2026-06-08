import { SortOrder } from "@/constants";
import { ResponseData } from "@/interfaces/common";
import { PageableResponse } from "@/interfaces/sessions";
import { ConditionGiaoDichDto, GiaoDich } from "@/interfaces/transaction";
import { request } from "@/services/axios";

export interface TransactionQueryParams {
  condition?: ConditionGiaoDichDto;
  page?: number;
  limit?: number;
  order?: {
    createdAt?: SortOrder;
  };
}

export const getTransactionsMe = (params?: TransactionQueryParams) =>
  request.get<TransactionQueryParams, ResponseData<PageableResponse<GiaoDich>>>(
    "/giao-dich/me",
    params
  );

export const getTransactionDetail = (id: string) =>
  request.get<undefined, ResponseData<GiaoDich>>(`/giao-dich/${id}`);

export const confirmTransaction = (id: string) =>
  request.post<undefined, ResponseData<GiaoDich>>(`/giao-dich/${id}/xac-nhan`);

export const rejectTransaction = (id: string) =>
  request.post<undefined, ResponseData<GiaoDich>>(`/giao-dich/${id}/tu-choi`);

export const updateContactNote = (id: string, data: { ghiChu: string }) =>
  request.put<{ ghiChu: string }, ResponseData<GiaoDich>>(
    `/giao-dich/${id}/ghi-chu`,
    data
  );

export const reportPaid = (id: string, data: { anhChungTu: string[] }) =>
  request.post<{ anhChungTu: string[] }, ResponseData<GiaoDich>>(
    `/giao-dich/${id}/da-chuyen-khoan`,
    data
  );

export const confirmPaymentReceived = (id: string) =>
  request.post<undefined, ResponseData<GiaoDich>>(
    `/giao-dich/${id}/xac-nhan-tien`
  );

export const completeTransaction = (id: string) =>
  request.post<undefined, ResponseData<GiaoDich>>(`/giao-dich/${id}/hoan-tat`);

export const signContract = (id: string) =>
  request.post<undefined, ResponseData<GiaoDich>>(
    `/giao-dich/${id}/ky-hop-dong`
  );

export const handoverTender = (id: string) =>
  request.post<undefined, ResponseData<GiaoDich>>(`/giao-dich/${id}/ban-giao`);

export const confirmTenderReceipt = (id: string) =>
  request.post<undefined, ResponseData<GiaoDich>>(
    `/giao-dich/${id}/xac-nhan-nhan`
  );

export const cancelTransaction = (id: string) =>
  request.post<undefined, ResponseData<GiaoDich>>(`/giao-dich/${id}/huy`);

export interface CreateReportDto {
  nguoiBiToCaoId: string;
  loai: string;
  tieuDe: string;
  noiDung: string;
  danhSachHinhAnh?: string[];
}

export const createReportUser = (data: CreateReportDto) =>
  request.post<CreateReportDto, ResponseData<any>>("/bao-cao-user", data);
