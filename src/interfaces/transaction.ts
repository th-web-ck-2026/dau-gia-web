import { LoaiPhien, TrangThaiGiaoDich } from "@/constants";

export interface ContactInfo {
  fullname?: string;
  email?: string;
  phone?: string;
  diaChi?: string | null;
}

export interface ThongTinChuyenKhoan {
  tenNganHang: string | null;
  soTaiKhoan: string | null;
  tenTaiKhoan: string | null;
  soTien: number | null;
  noiDungCK: string;
}

export interface GiaoDich {
  _id: string;
  phienId: string;
  loaiPhien: LoaiPhien;
  chuPhienId: string;
  nguoiThangId: string;
  trangThai: TrangThaiGiaoDich;
  giaChot?: number | null;
  hanXacNhan: string;
  thoiDiemXacNhan?: string | null;
  lyDoThatBai?: "TU_CHOI" | "QUA_HAN" | string | null;
  anhChungTu?: string[];
  thoiDiemNguoiThangBaoDaCK?: string | null;
  thoiDiemChuPhienXacNhanTien?: string | null;
  chuPhienDaKy?: boolean;
  nguoiThangDaKy?: boolean;
  daBanGiao?: boolean;
  nguoiThangXacNhanNhan?: boolean;
  ghiChuLienHeChuPhien?: string | null;
  ghiChuLienHeNguoiThang?: string | null;
  thoiDiemHoanTat?: string | null;
  lienHe?: {
    chuPhien: ContactInfo | null;
    nguoiThang: ContactInfo | null;
  } | null;
  thongTinChuyenKhoan?: ThongTinChuyenKhoan | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConditionGiaoDichDto {
  trangThai?: TrangThaiGiaoDich;
  loaiPhien?: LoaiPhien;
}
