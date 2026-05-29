export enum TrangThaiPhien {
  NHAP = "NHAP",
  CONG_BO = "CONG_BO",
  MO = "MO",
  DONG = "DONG",
  HUY = "HUY",
}

export interface AuctionSession {
  _id: string;
  tieuDe: string;
  moTa?: string;
  chuPhienId: string;
  trangThai: TrangThaiPhien;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  giaKhoiDiem: number;
  buocGia: number;
  giaTran?: number;
  trongSoGia: number;
  trongSoUyTin: number;
  trongSoCamKet?: number;
  deXuatThangId?: string;
  giaCaoNhat?: number;
  anDanh: boolean;
  createdAt?: string;
  updatedAt?: string;
  anhDaiDien?: string;
}

export interface TenderSession {
  _id: string;
  tieuDe: string;
  moTa?: string;
  chuPhienId: string;
  trangThai: TrangThaiPhien;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  giaToiDa?: number;
  trongSoKyThuat: number;
  trongSoGia: number;
  diemKyThuatToiThieu: number;
  anDanh: boolean;
  thoiDiemCongBo?: string;
  thoiDiemDong?: string;
  deXuatThangId?: string;
  createdAt?: string;
  updatedAt?: string;
  soNguoiThamGia?: number;
  anhDaiDien?: string;
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
