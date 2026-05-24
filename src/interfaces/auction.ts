import { TrangThaiDeXuat, TrangThaiPhien } from "./tender";

export interface AuctionSession {
  _id: string;
  tieuDe: string;
  moTa?: string;
  chuPhienId: string;
  trangThai: TrangThaiPhien;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  giaKhoiDiem: number;
  giaHienTai: number;
  buocGia: number;
  tienDatCoc?: number;
  trongSoGia: number;
  trongSoUyTin: number;
  trongSoCamKet?: number;
  anDanh: boolean;
  nguoiDanDauId?: string;
  thoiDiemDong?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuctionBid {
  _id: string;
  phienDauGiaId: string;
  nguoiDungId: string;
  giaTrao: number;
  diemGia?: number;
  diemUyTin?: number;
  diemCamKet?: number;
  diemTongHop?: number;
  trangThai: TrangThaiDeXuat;
  thoiDiemDat: string;
  thuTuServer: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAuctionDTO {
  tieuDe: string;
  moTa?: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  giaKhoiDiem: number;
  buocGia: number;
  tienDatCoc?: number;
  trongSoGia: number;
  trongSoUyTin: number;
  anDanh: boolean;
}

export interface PlaceBidDTO {
  giaTrao: number;
}

export interface PlaceBidResponse {
  thanhCong: boolean;
  giaId: string;
  giaCaoNhat: number;
  giaToiThieuKeTiep: number;
  dangDanDau: boolean;
  thongBao: string;
}

export interface AuctionStatusResponse {
  phienDauGiaId: string;
  giaHienTai: number;
  bietDanhNguoiDanDau: string;
  tongSoLuotDat: number;
  buocGia: number;
  giaHopLeKeTiep: number;
  thoiGianServer: string;
  thoiGianKetThuc: string;
  trangThai: TrangThaiPhien;
}
