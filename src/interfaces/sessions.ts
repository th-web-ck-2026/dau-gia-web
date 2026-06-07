import {
  HuongToiUu,
  LoaiTieuChi,
  NhomTieuChi,
  TrangThaiPhien,
} from "@/constants";

export interface TenderCriteria {
  _id: string;
  phienId: string;
  tenTieuChi: string;
  maTieuChi: string;
  nhom: NhomTieuChi;
  loai: LoaiTieuChi;
  trongSo: number;
  huongToiUu: HuongToiUu;
  batBuoc: boolean;
  rangBuocCung: boolean;
  cacLuaChon?: Array<{
    nhan: string;
    giaTri: number;
  }>;
  giaTriToiThieu?: number;
  giaTriToiDa?: number;
  donVi?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BaseSession {
  _id: string;
  tieuDe: string;
  danhSachHinhAnh?: string[];
  moTa?: string;
  chuPhienId: string;
  trangThai: TrangThaiPhien;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  anDanh: boolean;
  soLuongNguoiThamGia?: number;
  deXuatThang?: string | null;
  deXuatThangId?: string;
  thoiDiemDong?: string | null;
  createdAt?: string;
  updatedAt?: string;
  chuPhien?: {
    _id: string;
    fullname: string;
    email: string;
    phone: string | null;
    avatar: string | null;
  };
}

export interface AuctionSession extends BaseSession {
  giaKhoiDiem: number;
  buocGia: number;
}

export interface TenderSession extends BaseSession {
  thoiDiemCongBo?: string;
  tieuChi?: TenderCriteria[];
  diemKyThuatToiThieu?: number;
}

export interface KeyAssetItem {
  _id: string;
  tieuDe: string;
  moTa?: string;
  diaDiem?: string;
  loaiTaiSan?: string;
  giaKhoiDiem: number;
  soLuotDauGia?: number;
  anhDaiDien?: string;
  trangThai?: TrangThaiPhien;
}

export interface PageableResponse<T> {
  page: number;
  offset: number;
  limit: number;
  total: number;
  result: T[];
}

export interface UserBid {
  _id: string;
  nguoiThamGiaId?: string;
  nguoiThamGia?: {
    _id?: string;
    fullname?: string;
    avatar?: string;
  } | null;
  giaDat: number;
  thoiDiemDat: string;
}

export interface TenderSubmission {
  _id: string;
  nguoiThamGiaId?: string;
  thuHang?: number;
  nguoiThamGia?: {
    _id?: string;
    fullname?: string;
    avatar?: string;
  } | null;
  giaDeXuat: number;
  diemKyThuat?: number;
  diemGia?: number;
  diemTongHop?: number;
  trangThai: string;
}

export interface CreateAuctionSessionDto {
  tieuDe: string;
  moTa: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  giaKhoiDiem: number;
  buocGia: number;
  danhSachHinhAnh: string[];
  anDanh?: boolean;
}

export interface CreateTenderSessionDto {
  tieuDe: string;
  moTa: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  diemKyThuatToiThieu: number;
  tieuChi: Array<{
    tenTieuChi: string;
    maTieuChi: string;
    loai: string;
    trongSo: number;
    huongToiUu?: string;
    batBuoc?: boolean;
    giaTriToiThieu?: number;
    giaTriToiDa?: number;
    donVi?: string;
    cacLuaChon?: Array<{
      nhan: string;
      giaTri: number;
    }>;
  }>;
  danhSachHinhAnh: string[];
  anDanh?: boolean;
}
