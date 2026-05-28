import {
  AuctionSession,
  AuctionStatusResponse,
  CreateAuctionDTO,
  PlaceBidDTO,
  PlaceBidResponse,
} from "@/interfaces/auction";
import { ResponseData } from "@/interfaces/common";
import { TrangThaiPhien } from "@/interfaces/tender";

// import { request } from "@/services/axios";

// ==========================================
// === ORIGINAL AXIOS CALLS (COMMENTED OUT) ===
// ==========================================
/*
export const getAuctions = (params?: any) =>
  request.get<any, ResponseData<AuctionSession[]>>("/auction-sessions", params);

export const getAuctionDetail = (id: string) =>
  request.get<undefined, ResponseData<AuctionSession>>(
    `/auction-sessions/${id}`
  );

export const createAuction = (data: CreateAuctionDTO) =>
  request.post<
    CreateAuctionDTO,
    ResponseData<{ _id: string; trangThai: string }>
  >("/auction-sessions", data);

export const placeBid = (id: string, data: PlaceBidDTO) =>
  request.post<PlaceBidDTO, ResponseData<PlaceBidResponse>>(
    `/auction-sessions/${id}/bids`,
    data
  );

export const getAuctionStatus = (id: string) =>
  request.get<undefined, ResponseData<AuctionStatusResponse>>(
    `/auction-sessions/${id}/status`,
    undefined,
    {
      _silent: true,
    }
  );

export const closeAuction = (id: string) =>
  request.post<undefined, ResponseData<any>>(`/auction-sessions/${id}/close`);
*/

// ==========================================
// === IN-MEMORY MOCK DATABASE START ===
// ==========================================

const MOCK_AUCTIONS: AuctionSession[] = [
  {
    _id: "auction-1",
    tieuDe: "Thanh lý xe ô tô Camry 2.5Q cũ công sở",
    moTa: "Xe đăng ký năm 2020, đi được 45,000 km. Đầy đủ giấy tờ pháp lý chính chủ, lịch sử bảo dưỡng chính hãng định kỳ.",
    chuPhienId: "host-1",
    trangThai: TrangThaiPhien.MO,
    thoiGianBatDau: new Date(Date.now() - 3600 * 1000).toISOString(),
    thoiGianKetThuc: new Date(Date.now() + 3600 * 1000 * 2).toISOString(),
    giaKhoiDiem: 650000000,
    buocGia: 5000000,
    giaHienTai: 670000000,
    tienDatCoc: 20000000,
    trongSoGia: 0.7,
    trongSoUyTin: 0.3,
    anDanh: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "auction-2",
    tieuDe: "Đầu giá quyền sử dụng lô đất khu đô thị mới Mỹ Đình",
    moTa: "Lô đất dịch vụ diện tích 90m2, mặt tiền rộng 6m, hạ tầng điện nước ngầm đồng bộ.",
    chuPhienId: "host-1",
    trangThai: TrangThaiPhien.CONG_BO,
    thoiGianBatDau: new Date(Date.now() + 3600 * 1000 * 24).toISOString(),
    thoiGianKetThuc: new Date(Date.now() + 3600 * 1000 * 48).toISOString(),
    giaKhoiDiem: 8500000000,
    buocGia: 50000000,
    giaHienTai: 8500000000,
    tienDatCoc: 500000000,
    trongSoGia: 0.8,
    trongSoUyTin: 0.2,
    anDanh: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "auction-3",
    tieuDe: "Đấu giá thanh lý lô linh kiện máy tính đồng bộ văn phòng",
    moTa: "Lô bao gồm 20 thùng CPU Core i5 Gen 8, RAM 8GB, SSD 256GB đang hoạt động tốt.",
    chuPhienId: "host-1",
    trangThai: TrangThaiPhien.DONG,
    thoiGianBatDau: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    thoiGianKetThuc: new Date(Date.now() - 3600 * 1000).toISOString(),
    giaKhoiDiem: 30000000,
    buocGia: 1000000,
    giaHienTai: 45000000,
    tienDatCoc: 2000000,
    trongSoGia: 0.5,
    trongSoUyTin: 0.5,
    anDanh: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Tracks the current leader in memory
const DYNAMIC_LEADERS: Record<string, { username: string; amount: number }> = {
  "auction-1": { username: "Nhà đầu giá Alpha", amount: 670000000 },
};

// ==========================================
// === MOCK API IMPLEMENTATIONS ===
// ==========================================

export const getAuctions = async (
  _params?: any
): Promise<ResponseData<AuctionSession[]>> => {
  await new Promise((r) => setTimeout(r, 400));
  return {
    statusCode: 200,
    message: "Thành công",
    data: MOCK_AUCTIONS,
  };
};

export const getAuctionDetail = async (
  id: string
): Promise<ResponseData<AuctionSession>> => {
  await new Promise((r) => setTimeout(r, 300));
  const found = MOCK_AUCTIONS.find((a) => a._id === id);
  if (!found)
    throw {
      statusCode: 404,
      data: { message: "Không tìm thấy phiên đấu giá!" },
    };

  const livePrice = DYNAMIC_LEADERS[id]?.amount ?? found.giaHienTai;

  return {
    statusCode: 200,
    message: "Thành công",
    data: {
      ...found,
      giaHienTai: livePrice,
    },
  };
};

export const createAuction = async (
  data: CreateAuctionDTO
): Promise<ResponseData<{ _id: string; trangThai: string }>> => {
  await new Promise((r) => setTimeout(r, 600));
  const newId = `auction-${Date.now()}`;
  const newAuction: AuctionSession = {
    _id: newId,
    tieuDe: data.tieuDe,
    moTa: data.moTa || "",
    chuPhienId: "host-1",
    trangThai: TrangThaiPhien.NHAP,
    thoiGianBatDau: data.thoiGianBatDau,
    thoiGianKetThuc: data.thoiGianKetThuc,
    giaKhoiDiem: data.giaKhoiDiem,
    buocGia: data.buocGia,
    giaHienTai: data.giaKhoiDiem,
    tienDatCoc: data.tienDatCoc || 0,
    trongSoGia: data.trongSoGia,
    trongSoUyTin: data.trongSoUyTin,
    anDanh: data.anDanh ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  MOCK_AUCTIONS.push(newAuction);
  DYNAMIC_LEADERS[newId] = { username: "Chưa có", amount: data.giaKhoiDiem };

  return {
    statusCode: 201,
    message: "Thành công",
    data: {
      _id: newId,
      trangThai: TrangThaiPhien.NHAP,
    },
  };
};

let bidCount = 0;

export const placeBid = async (
  id: string,
  data: PlaceBidDTO
): Promise<ResponseData<PlaceBidResponse>> => {
  await new Promise((r) => setTimeout(r, 500));
  const found = MOCK_AUCTIONS.find((a) => a._id === id);
  if (!found)
    throw { statusCode: 404, data: { message: "Phiên không tồn tại" } };

  const currentLeaderAmount = DYNAMIC_LEADERS[id]?.amount ?? found.giaHienTai;

  bidCount++;
  if (bidCount % 4 === 0) {
    const higherBid = currentLeaderAmount + found.buocGia;
    DYNAMIC_LEADERS[id] = { username: "Nhà đầu giá Robot", amount: higherBid };

    throw {
      statusCode: 409,
      data: {
        giaCaoNhat: higherBid,
        giaToiThieuKeTiep: higherBid + found.buocGia,
        message: "Giá thầu đã bị thay đổi bởi người dùng khác!",
      },
    };
  }

  const nextValidPrice = currentLeaderAmount + found.buocGia;
  if (data.giaTrao < nextValidPrice) {
    throw {
      statusCode: 400,
      data: {
        message: `Mức giá không hợp lệ. Phải lớn hơn hoặc bằng ${nextValidPrice}`,
      },
    };
  }

  DYNAMIC_LEADERS[id] = {
    username: "Bạn (Người dùng)",
    amount: data.giaTrao,
  };

  return {
    statusCode: 200,
    message: "Đặt giá thành công",
    data: {
      thanhCong: true,
      giaId: `bid-${Date.now()}`,
      giaCaoNhat: data.giaTrao,
      giaToiThieuKeTiep: data.giaTrao + found.buocGia,
      dangDanDau: true,
      thongBao: "Đặt giá thầu mới thành công",
    },
  };
};

export const getAuctionStatus = async (
  id: string
): Promise<ResponseData<AuctionStatusResponse>> => {
  const found = MOCK_AUCTIONS.find((a) => a._id === id);
  if (!found) throw { statusCode: 404, data: { message: "Không tồn tại" } };

  const currentLeader = DYNAMIC_LEADERS[id] || {
    username: "Chưa có",
    amount: found.giaHienTai,
  };

  if (currentLeader.username === "Bạn (Người dùng)" && Math.random() < 0.25) {
    const newPrice = currentLeader.amount + found.buocGia;
    DYNAMIC_LEADERS[id] = {
      username: "Đối thủ ẩn danh",
      amount: newPrice,
    };
  }

  const updatedLeader = DYNAMIC_LEADERS[id] || {
    username: "Chưa có",
    amount: found.giaHienTai,
  };

  return {
    statusCode: 200,
    message: "Thành công",
    data: {
      phienDauGiaId: id,
      giaHienTai: updatedLeader.amount,
      bietDanhNguoiDanDau: updatedLeader.username,
      tongSoLuotDat: bidCount,
      buocGia: found.buocGia,
      giaHopLeKeTiep: updatedLeader.amount + found.buocGia,
      thoiGianServer: new Date().toISOString(),
      thoiGianKetThuc: found.thoiGianKetThuc,
      trangThai: found.trangThai,
    },
  };
};

export const closeAuction = async (id: string): Promise<ResponseData<any>> => {
  await new Promise((r) => setTimeout(r, 400));
  const found = MOCK_AUCTIONS.find((a) => a._id === id);
  if (found) {
    found.trangThai = TrangThaiPhien.DONG;
  }
  return {
    statusCode: 200,
    message: "Thành công",
    data: true,
  };
};
