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
  >("/xac-minh-user/admin/page", params);

export const adminDuyetDonXacMinh = (id: string, data: AdminDuyetPayload) =>
  request.post<AdminDuyetPayload, ResponseData<AdminXacMinhUserData>>(
    `/xac-minh-user/admin/${id}/duyet`,
    data
  );

// ─── Stats Dashboard ────────────────────────────────────────────────────────

export interface AdminStatsResponse {
  users: {
    total: number;
    active: number;
    blocked: number;
    verified: number;
    unverified: number;
    byRole: { ADMIN: number; USER: number };
    byType: { TO_CHUC: number; CA_NHAN: number };
  };
  auctions: {
    total: number;
    draft: number;
    published: number;
    open: number;
    closed: number;
    cancelled: number;
    successful: number;
    totalWinningValue: number;
    totalBids: number;
  };
  tenders: {
    total: number;
    draft: number;
    published: number;
    open: number;
    closed: number;
    cancelled: number;
    successful: number;
    totalSubmissions: number;
  };
  verifications: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

export const getAdminStats = () =>
  request.get<undefined, ResponseData<AdminStatsResponse>>(
    "/thong-ke/admin/stats"
  );

// ─── User Management ────────────────────────────────────────────────────────

export interface AdminUserRow {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  role: string;
  userRoles: string;
  userStatus: string;
  isVerified: boolean;
  createdAt: string;
}

export interface AdminUserPageCondition {
  role?: string;
  userStatus?: string;
  userRoles?: string;
  isVerified?: boolean;
}

export interface AdminUserPageParams {
  page?: number;
  limit?: number;
  condition?: AdminUserPageCondition;
}

export interface UpdateUserAdminPayload {
  fullname?: string;
  role?: string;
  userStatus?: string;
  isVerified?: boolean;
}

export const getAdminUserPage = (params?: AdminUserPageParams) =>
  request.get<
    AdminUserPageParams,
    ResponseData<PageableResponse<AdminUserRow>>
  >("/user/admin/page", params);

export const updateUserByAdmin = (id: string, data: UpdateUserAdminPayload) =>
  request.put<UpdateUserAdminPayload, ResponseData<AdminUserRow>>(
    `/user/admin/${id}`,
    data
  );

// ─── User Reports Management ──────────────────────────────────────────────────

export interface AdminReportRow {
  _id: string;
  nguoiToCaoId: string;
  nguoiBiToCaoId: string;
  loai: string;
  tieuDe: string;
  noiDung: string;
  danhSachHinhAnh: string[];
  trangThai: string;
  phanHoiAdmin?: string;
  adminXuLyId?: string;
  thoiGianXuLy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminReportPageCondition {
  _id?: string;
  nguoiToCaoId?: string;
  nguoiBiToCaoId?: string;
  loai?: string;
  trangThai?: string;
}

export interface AdminReportPageParams {
  page?: number;
  limit?: number;
  condition?: AdminReportPageCondition;
}

export interface ReplyReportPayload {
  phanHoiAdmin: string;
}

export const getAdminReports = (params?: AdminReportPageParams) =>
  request.get<
    AdminReportPageParams,
    ResponseData<PageableResponse<AdminReportRow>>
  >("/bao-cao-user/admin", params);

export const getAdminReportDetail = (id: string) =>
  request.get<undefined, ResponseData<AdminReportRow>>(
    `/bao-cao-user/admin/${id}`
  );

export const replyAdminReport = (id: string, data: ReplyReportPayload) =>
  request.put<ReplyReportPayload, ResponseData<AdminReportRow>>(
    `/bao-cao-user/admin/${id}/tra-loi`,
    data
  );
