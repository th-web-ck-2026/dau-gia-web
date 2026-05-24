export enum LoaiPhien {
  DAU_THAU = "DAU_THAU",
  DAU_GIA = "DAU_GIA",
}

export enum TrangThaiPhien {
  NHAP = "NHAP",
  CONG_BO = "CONG_BO",
  MO = "MO",
  DONG = "DONG",
  HUY = "HUY",
}

export enum LoaiTieuChi {
  SO = "SO",
  PHAN_TRAM = "PHAN_TRAM",
  DUNG_SAI = "DUNG_SAI",
  LUA_CHON = "LUA_CHON",
  TAI_LIEU = "TAI_LIEU",
}

export enum TrangThaiDeXuat {
  CHO_DUYET = "CHO_DUYET",
  HOP_LE = "HOP_LE",
  BI_TU_CHOI = "BI_TU_CHOI",
  DAN_DAU = "DAN_DAU",
  THANG = "THANG",
  THUA = "THUA",
}

export enum HuongToiUu {
  CAO_HON = "CAO_HON",
  THAP_HON = "THAP_HON",
}

export interface TenderCriteria {
  _id?: string;
  phienId?: string;
  tenTieuChi: string;
  maTieuChi: string;
  nhom: "sang_loc" | "ky_thuat" | "thuong_mai" | "gia_tri" | "rui_ro";
  loai: LoaiTieuChi;
  trongSo: number;
  huongToiUu: HuongToiUu;
  batBuoc: boolean;
  rangBuocCung: boolean;
  cacLuaChon?: Array<{ nhan: string; giaTri: string; diem: number }>;
  giaTriToiThieu?: number;
  giaTriToiDa?: number;
  donVi?: string;
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
  createdAt: string;
  updatedAt: string;
  tieuChi?: TenderCriteria[];
}

export interface TenderSubmissionValue {
  _id?: string;
  deXuatId?: string;
  tieuChiId?: string;
  maTieuChi: string;
  giaTriSo?: number;
  giaTriChuoi?: string;
  giaTriDungSai?: boolean;
  giaTriJson?: any;
  giaTriGoc: any;
  diemChuanHoa?: number;
  diemCoTrongSo?: number;
}

export interface TenderSubmission {
  _id: string;
  phienId: string;
  nguoiThamGiaId: string;
  trangThai: TrangThaiDeXuat;
  giaDeXuat: number;
  diemKyThuat?: number;
  diemGia?: number;
  diemTongHop?: number;
  thuHang?: number;
  lyDoTuChoi?: string;
  thoiDiemNop: string;
  updatedAt: string;
  cacGiaTri?: TenderSubmissionValue[];
}

export interface CreateTenderDTO {
  tieuDe: string;
  moTa?: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  giaToiDa?: number;
  trongSoKyThuat: number;
  trongSoGia: number;
  diemKyThuatToiThieu: number;
  anDanh: boolean;
  tieuChi: TenderCriteria[];
}

export interface SubmitProposalDTO {
  giaDeXuat: number;
  cacGiaTri: Array<{
    maTieuChi: string;
    giaTri: any;
  }>;
}

export interface TenderRankingItem {
  thuHang: number;
  deXuatId: string;
  bietDanh: string;
  diemKyThuat?: number;
  diemGia?: number;
  diemTongHop?: number;
  trangThai: TrangThaiDeXuat;
}

export interface TenderRankingResponse {
  phienId: string;
  trangThai: TrangThaiPhien;
  danhSach: TenderRankingItem[];
}
