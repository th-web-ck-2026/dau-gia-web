# Kế hoạch công việc - DEV A: Core API, Danh sách & Đấu giá (Auction)

Hồ sơ công việc này tập trung vào phần nền tảng API, trang danh sách chung và phân hệ Đấu giá trực tuyến (realtime/polling).
Tất cả các thư mục và tập tin dưới đây được thiết kế riêng biệt để đảm bảo không bị xung đột code với DEV B.

---

## 1. Bản đồ thư mục & Tập tin đảm trách (Chỉ DEV A chỉnh sửa)

```text
src/
├── api/
│   └── auction.ts              <-- Dịch vụ kết nối API Đấu giá
├── interfaces/
│   └── auction.ts              <-- Kiểu dữ liệu (Types) Đấu giá
└── app/
    └── [locale]/
        └── (client)/
            ├── sessions/       <-- Trang danh sách phiên chung
            │   └── page.tsx
            └── auctions/       <-- Trang chi tiết Đấu giá
                └── [id]/
                    └── page.tsx
```

---

## 2. Các màn hình & Route cần phát triển

- `/sessions`: Trang danh sách phiên (gồm cả Đấu thầu và Đấu giá).
- `/auctions/:id`: Chi tiết phiên đấu giá trực tuyến (tách biệt hoàn toàn với trang chi tiết đấu thầu `/tenders/:id` của DEV B).

---

## 3. Chi tiết công việc cụ thể

### 3.1 Định nghĩa DTO & API Client

- **Tạo file định nghĩa kiểu dữ liệu:**
  - `src/interfaces/auction.ts`
  - Định nghĩa các enum và interface: `AuctionSession`, `AuctionBid`, `LoaiPhien`, `TrangThaiPhien`, `TrangThaiDeXuat`.
- **Tạo file API Client:**
  - `src/api/auction.ts`
  - Sử dụng helper `request` từ `@/services/axios` để viết các hàm kết nối:
    - Lấy danh sách phiên đấu giá: `GET /auction-sessions`
    - Lấy trạng thái đấu giá realtime: `GET /auction-sessions/:id/status`
    - Đặt giá: `POST /auction-sessions/:id/bids`
    - Đóng phiên đấu giá: `POST /auction-sessions/:id/close`

### 3.2 Trang danh sách phiên (`/sessions`)

- **Yêu cầu UI:**
  - Định tuyến: `src/app/[locale]/(client)/sessions/page.tsx`
  - Thiết kế tab phân tách: **Đấu thầu (Tender)** và **Đấu giá (Auction)**.
  - Bộ lọc (Filter panel): Lọc theo trạng thái (Nháp, Công bố, Đang mở, Đã đóng), thời gian bắt đầu/kết thúc, khoảng giá trần/giá khởi điểm, từ khóa tìm kiếm.
  - Sử dụng `BaseRow` và `BaseCol` để render danh sách dạng thẻ (Cards).
  - Mỗi thẻ hiển thị: Tên phiên, Trạng thái (Badge), Thời gian đếm ngược (Countdown), Giá hiện tại/Giá gói thầu, Số lượt tham gia.
- **Dịch thuật (i18n):**
  - Chỉ sử dụng và định nghĩa các key dịch thuật bên dưới namespace `"sessions"` trong `vi.json` và `en.json`.

### 3.3 Chi tiết phiên Đấu giá (`/auctions/:id`)

- **Yêu cầu UI:**
  - Định tuyến: `src/app/[locale]/(client)/auctions/[id]/page.tsx`
  - **Thông tin tài sản:** Tên tài sản, hình ảnh slideshow, mô tả tài sản, chủ sở hữu.
  - **Bảng điều khiển đặt giá (Bidding Panel):**
    - Trạng thái phiên đấu giá (Badge).
    - Bộ đếm ngược thời gian kết thúc (Countdown) đồng bộ thời gian Server.
    - Giá cao nhất hiện tại (`currentPrice`) hiển thị nổi bật.
    - Giá trị gợi ý đặt tối thiểu tiếp theo (`nextValidBid` = `currentPrice` + `buocGia`).
    - Ô nhập giá `BaseInput` (mặc định lấy `nextValidBid`).
    - Nút "Đặt giá" (`BaseButton` type="primary") – bị vô hiệu hóa khi đang gửi request.
  - **Lịch sử đặt giá (Bid History):**
    - Danh sách hiển thị các lượt đặt giá trước đó xếp theo thứ tự thời gian mới nhất lên đầu.
    - Ẩn danh tên người đặt (`User X`) nếu phiên có cấu hình `anDanh: true`.
- **Dịch thuật (i18n):**
  - Chỉ sử dụng và định nghĩa các key dịch thuật bên dưới namespace `"auction"` trong `vi.json` và `en.json`.
- **Tích hợp BE:**
  - API lấy thông tin chi tiết: `GET /auction-sessions/:id/status` (Thực hiện **polling mỗi 3 giây** khi phiên đang `OPEN`).
  - API đặt giá: `POST /auction-sessions/:id/bids` gửi body `{ giaTrao: number }`.

---

## 4. Hướng dẫn tích hợp & Kỹ thuật chi tiết

### 4.1 Thuật toán đếm ngược đồng bộ Server (Server Time Sync)

Không sử dụng thời gian của máy người dùng (`new Date()`). Triển khai theo logic sau:

1. Khi lấy thông tin chi tiết phiên từ API, lấy thêm trường `thoiGianServer`.
2. Tính độ lệch: `offset = new Date(thoiGianServer).getTime() - Date.now()`.
3. Khi tính thời gian đếm ngược: `timeLeft = new Date(thoiGianKetThuc).getTime() - (Date.now() + offset)`.

### 4.2 Xử lý đặt giá đồng thời (Conflict 409)

Khi gọi API đặt giá và nhận về lỗi `409 Conflict` (do có người khác đã đặt giá cao hơn trước):

1. Bắt lỗi trong catch block của mutation.
2. Hiển thị thông báo thất bại: _"Giá hiện tại đã thay đổi. Vui lòng thử lại!"_ bằng `notification.error` từ `useFeedback`.
3. Đọc dữ liệu trả về từ error response (`giaCaoNhat`, `giaToiThieuKeTiep`).
4. Cập nhật ngay lập tức `currentPrice` hiển thị thành `giaCaoNhat` và cập nhật giá trị trong ô Input đặt giá thành `giaToiThieuKeTiep`.
