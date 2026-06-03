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
  cacLuaChon?: string[];
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
  giaTran?: number;
  trongSoGia: number;
  trongSoUyTin: number;
  trongSoCamKet?: number;
  giaCaoNhat?: number;
}

export interface TenderSession extends BaseSession {
  giaToiDa?: number;
  trongSoKyThuat: number;
  trongSoGia: number;
  diemKyThuatToiThieu: number;
  thoiDiemCongBo?: string;
  tieuChi?: TenderCriteria[];
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
