import { ResponseData } from "@/interfaces/common";
import {
  CreateTenderDTO,
  HuongToiUu,
  LoaiTieuChi,
  SubmitProposalDTO,
  TenderRankingItem,
  TenderRankingResponse,
  TenderSession,
  TenderSubmission,
  TrangThaiDeXuat,
  TrangThaiPhien,
} from "@/interfaces/tender";

// import { request } from "@/services/axios";

// ==========================================
// === ORIGINAL AXIOS CALLS (COMMENTED OUT) ===
// ==========================================
/*
export const getTenders = (params?: any) =>
  request.get<any, ResponseData<TenderSession[]>>("/tender-sessions", params);

export const getTenderDetail = (id: string) =>
  request.get<undefined, ResponseData<TenderSession>>(`/tender-sessions/${id}`);

export const createTender = (data: CreateTenderDTO) =>
  request.post<
    CreateTenderDTO,
    ResponseData<{ _id: string; trangThai: string }>
  >("/tender-sessions", data);

export const publishTender = (id: string) =>
  request.post<undefined, ResponseData<any>>(`/tender-sessions/${id}/publish`);

export const submitProposal = (id: string, data: SubmitProposalDTO) =>
  request.post<SubmitProposalDTO, ResponseData<TenderSubmission>>(
    `/tender-sessions/${id}/submissions`,
    data
  );

export const getTenderRanking = (id: string) =>
  request.get<undefined, ResponseData<TenderRankingResponse>>(
    `/tender-sessions/${id}/ranking`
  );

export const closeTender = (id: string) =>
  request.post<undefined, ResponseData<any>>(`/tender-sessions/${id}/close`);
*/

// ==========================================
// === IN-MEMORY MOCK DATABASE START ===
// ==========================================

const MOCK_TENDERS: TenderSession[] = [
  {
    _id: "tender-1",
    tieuDe: "Gói thầu thiết kế Website thương mại điện tử BidWar 2026",
    moTa: "Yêu cầu xây dựng hệ thống website TMĐT có khả năng chịu tải tốt, hỗ trợ đa ngôn ngữ, tích hợp cổng thanh toán quốc tế và thiết kế chuẩn SEO tối ưu UI/UX.",
    chuPhienId: "host-1",
    trangThai: TrangThaiPhien.MO,
    thoiGianBatDau: new Date(Date.now() - 3600 * 1000).toISOString(),
    thoiGianKetThuc: new Date(Date.now() + 3600 * 1000 * 5).toISOString(),
    giaToiDa: 250000000,
    trongSoKyThuat: 0.6,
    trongSoGia: 0.4,
    diemKyThuatToiThieu: 60,
    anDanh: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tieuChi: [
      {
        _id: "tc-1",
        tenTieuChi: "Thời gian hoàn thành dự án",
        maTieuChi: "tg_hoan_thanh",
        nhom: "ky_thuat",
        loai: LoaiTieuChi.SO,
        trongSo: 0.4,
        huongToiUu: HuongToiUu.THAP_HON,
        batBuoc: true,
        donVi: "ngày",
        rangBuocCung: false,
      },
      {
        _id: "tc-2",
        tenTieuChi: "Cam kết uptime SLA hệ thống",
        maTieuChi: "sla_uptime",
        nhom: "ky_thuat",
        loai: LoaiTieuChi.PHAN_TRAM,
        trongSo: 0.6,
        huongToiUu: HuongToiUu.CAO_HON,
        batBuoc: true,
        rangBuocCung: false,
      },
    ],
  },
  {
    _id: "tender-2",
    tieuDe: "Gói thầu cung cấp thiết bị máy chủ dữ liệu dự phòng",
    moTa: "Cung cấp, cấu hình và bàn giao 02 cụm máy chủ Rackmount 2U phục vụ lưu trữ Big Data.",
    chuPhienId: "host-1",
    trangThai: TrangThaiPhien.CONG_BO,
    thoiGianBatDau: new Date(Date.now() + 3600 * 1000 * 2).toISOString(),
    thoiGianKetThuc: new Date(Date.now() + 3600 * 1000 * 24).toISOString(),
    giaToiDa: 800000000,
    trongSoKyThuat: 0.5,
    trongSoGia: 0.5,
    diemKyThuatToiThieu: 70,
    anDanh: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tieuChi: [],
  },
  {
    _id: "tender-3",
    tieuDe: "Gói thầu bảo trì hệ thống hạ tầng mạng nội bộ",
    moTa: "Thực hiện bảo trì định kỳ, nâng cấp tường lửa và tối ưu hóa băng thông truyền tải mạng chi nhánh.",
    chuPhienId: "host-1",
    trangThai: TrangThaiPhien.DONG,
    thoiGianBatDau: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    thoiGianKetThuc: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    giaToiDa: 120000000,
    trongSoKyThuat: 0.7,
    trongSoGia: 0.3,
    diemKyThuatToiThieu: 50,
    anDanh: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tieuChi: [],
  },
];

// In-memory submissions database
const MOCK_SUBMISSIONS: Record<string, TenderSubmission[]> = {
  "tender-1": [
    {
      _id: "sub-101",
      phienId: "tender-1",
      nguoiThamGiaId: "bidder-a",
      trangThai: TrangThaiDeXuat.HOP_LE,
      giaDeXuat: 210000000,
      diemKyThuat: 85,
      diemGia: 90,
      diemTongHop: 87,
      thuHang: 1,
      thoiDiemNop: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "sub-102",
      phienId: "tender-1",
      nguoiThamGiaId: "bidder-b",
      trangThai: TrangThaiDeXuat.HOP_LE,
      giaDeXuat: 240000000,
      diemKyThuat: 95,
      diemGia: 75,
      diemTongHop: 83,
      thuHang: 2,
      thoiDiemNop: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
};

// ==========================================
// === MOCK API IMPLEMENTATIONS ===
// ==========================================

export const getTenders = async (
  _params?: any
): Promise<ResponseData<TenderSession[]>> => {
  await new Promise((r) => setTimeout(r, 400));
  return {
    statusCode: 200,
    message: "Thành công",
    data: MOCK_TENDERS,
  };
};

export const getTenderDetail = async (
  id: string
): Promise<ResponseData<TenderSession>> => {
  await new Promise((r) => setTimeout(r, 300));
  const found = MOCK_TENDERS.find((t) => t._id === id);
  if (!found)
    throw { statusCode: 404, data: { message: "Không tìm thấy phiên thầu!" } };
  return {
    statusCode: 200,
    message: "Thành công",
    data: found,
  };
};

export const createTender = async (
  data: CreateTenderDTO
): Promise<ResponseData<{ _id: string; trangThai: string }>> => {
  await new Promise((r) => setTimeout(r, 600));
  const newId = `tender-${Date.now()}`;
  const newTender: TenderSession = {
    _id: newId,
    tieuDe: data.tieuDe,
    moTa: data.moTa || "",
    chuPhienId: "host-1",
    trangThai: TrangThaiPhien.NHAP,
    thoiGianBatDau: data.thoiGianBatDau,
    thoiGianKetThuc: data.thoiGianKetThuc,
    giaToiDa: data.giaToiDa || 0,
    trongSoKyThuat: data.trongSoKyThuat,
    trongSoGia: data.trongSoGia,
    diemKyThuatToiThieu: data.diemKyThuatToiThieu,
    anDanh: data.anDanh ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tieuChi: (data.tieuChi || []).map((tc, index) => ({
      _id: `tc-dyn-${index}`,
      phienId: newId,
      ...tc,
    })),
  };

  MOCK_TENDERS.push(newTender);
  MOCK_SUBMISSIONS[newId] = [];

  return {
    statusCode: 201,
    message: "Thành công",
    data: {
      _id: newId,
      trangThai: TrangThaiPhien.NHAP,
    },
  };
};

export const publishTender = async (id: string): Promise<ResponseData<any>> => {
  await new Promise((r) => setTimeout(r, 300));
  const found = MOCK_TENDERS.find((t) => t._id === id);
  if (found) {
    found.trangThai = TrangThaiPhien.MO;
  }
  return {
    statusCode: 200,
    message: "Đã công bố phiên thầu thành công",
    data: true,
  };
};

export const submitProposal = async (
  id: string,
  data: SubmitProposalDTO
): Promise<ResponseData<TenderSubmission>> => {
  await new Promise((r) => setTimeout(r, 600));
  const tender = MOCK_TENDERS.find((t) => t._id === id);
  if (!tender)
    throw { statusCode: 404, data: { message: "Phiên thầu không tồn tại" } };

  const mockTechScore = Math.floor(Math.random() * 40) + 60; // 60 - 100
  const maxPrice = tender.giaToiDa || 300000000;
  const mockPriceScore = Math.min(
    100,
    Math.floor(((maxPrice - data.giaDeXuat + maxPrice / 2) / maxPrice) * 100)
  );

  const totalScore =
    mockTechScore * tender.trongSoKyThuat + mockPriceScore * tender.trongSoGia;

  const newSubmission: TenderSubmission = {
    _id: `sub-${Date.now()}`,
    phienId: id,
    nguoiThamGiaId: "me",
    trangThai: TrangThaiDeXuat.HOP_LE,
    giaDeXuat: data.giaDeXuat,
    diemKyThuat: mockTechScore,
    diemGia: mockPriceScore,
    diemTongHop: totalScore,
    thuHang: 1,
    thoiDiemNop: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (!MOCK_SUBMISSIONS[id]) {
    MOCK_SUBMISSIONS[id] = [];
  }

  MOCK_SUBMISSIONS[id].push(newSubmission);
  MOCK_SUBMISSIONS[id] = MOCK_SUBMISSIONS[id]
    .sort((a, b) => (b.diemTongHop ?? 0) - (a.diemTongHop ?? 0))
    .map((item, idx) => ({ ...item, thuHang: idx + 1 }));

  const yours = MOCK_SUBMISSIONS[id].find(
    (sub) => sub._id === newSubmission._id
  )!;

  return {
    statusCode: 200,
    message: "Nộp hồ sơ thành công",
    data: yours,
  };
};

export const getTenderRanking = async (
  id: string
): Promise<ResponseData<TenderRankingResponse>> => {
  await new Promise((r) => setTimeout(r, 300));
  const submissions = MOCK_SUBMISSIONS[id] || [];

  const mappedRanking: TenderRankingItem[] = submissions.map((sub) => ({
    thuHang: sub.thuHang || 1,
    deXuatId: sub._id,
    bietDanh:
      sub.nguoiThamGiaId === "me"
        ? "Bạn (Đối tác)"
        : `Nhà thầu ẩn danh (${sub.nguoiThamGiaId.substring(0, 4)})`,
    diemKyThuat: sub.diemKyThuat,
    diemGia: sub.diemGia,
    diemTongHop: sub.diemTongHop,
    trangThai: sub.trangThai,
  }));

  const foundTender = MOCK_TENDERS.find((t) => t._id === id);

  return {
    statusCode: 200,
    message: "Thành công",
    data: {
      phienId: id,
      trangThai: foundTender?.trangThai || TrangThaiPhien.MO,
      danhSach: mappedRanking,
    },
  };
};

export const closeTender = async (id: string): Promise<ResponseData<any>> => {
  await new Promise((r) => setTimeout(r, 400));
  const found = MOCK_TENDERS.find((t) => t._id === id);
  if (found) {
    found.trangThai = TrangThaiPhien.DONG;
  }
  return {
    statusCode: 200,
    message: "Thành công",
    data: true,
  };
};
