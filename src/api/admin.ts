import { SortOrder, TrangThaiXacMinhUser } from "@/constants";
import { User, XacMinhUserData } from "@/interfaces/auth";
import { ResponseData } from "@/interfaces/common";
import { PageableResponse } from "@/interfaces/sessions";
import { request } from "@/services/axios";

export interface AdminXacMinhQueryParams {
  condition?: {
    trangThai?: TrangThaiXacMinhUser;
    userId?: string;
  };
  page?: number;
  limit?: number;
  order?: {
    createdAt?: SortOrder;
  };
}

export interface AdminDuyetPayload {
  trangThai: TrangThaiXacMinhUser;
  lyDoTuChoi?: string;
}

export type AdminXacMinhUserData = XacMinhUserData & {
  user?: User;
};

export const getAdminXacMinhUsers = (params?: AdminXacMinhQueryParams) =>
  request.get<
    AdminXacMinhQueryParams,
    ResponseData<PageableResponse<AdminXacMinhUserData>>
  >("/xac-minh-user", params);

export const adminDuyetDonXacMinh = (id: string, data: AdminDuyetPayload) =>
  request.post<AdminDuyetPayload, ResponseData<AdminXacMinhUserData>>(
    `/xac-minh-user/admin/${id}/duyet`,
    data
  );
