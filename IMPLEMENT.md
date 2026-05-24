# Kế hoạch triển khai - Hệ thống Đấu thầu & Đấu giá (Single Developer)

> [!IMPORTANT]
> **Tài liệu tham khảo giao diện:** Chi tiết thiết kế, các component AntD và wireframes cụ thể cho từng màn hình được trình bày tại [UI_DESC.md](./UI_DESC.md).

Tài liệu này hướng dẫn chi tiết các bước triển khai toàn bộ luồng Đấu thầu và Đấu giá dành cho một lập trình viên duy nhất. Kế hoạch tuân thủ cấu trúc của codebase (phân tách rõ ràng giữa `app/` và `features/`) và thiết lập giao diện sạch sẽ, dễ bảo trì.

---

## 1. Cấu trúc thư mục dự kiến

```text
src/
├── api/
│   ├── auction.ts              # Gọi các API liên quan đến Đấu giá
│   └── tender.ts               # Gọi các API liên quan đến Đấu thầu
├── interfaces/
│   ├── auction.ts              # TypeScript Type & DTO Đấu giá
│   └── tender.ts               # TypeScript Type & DTO Đấu thầu
├── features/
│   ├── sessions/
│   │   ├── list/               # Trang danh sách phiên (Tender & Auction)
│   │   └── detail/             # Trang chi tiết phiên chung
│   │       ├── components/
│   │       │   ├── AuctionDetail.tsx  # Giao diện Đấu giá trực tuyến
│   │       │   └── TenderDetail.tsx   # Giao diện Đấu thầu & Nộp proposal
│   │       ├── index.tsx
│   │       ├── index.hooks.ts
│   │       ├── index.styles.ts
│   │       └── index.utils.ts
│   ├── host/                   # Các màn hình tạo/quản lý phiên của Host
│   │   ├── components/
│   │   │   └── CriteriaBuilder.tsx # Bộ xây dựng tiêu chí đấu thầu động
│   │   ├── list/
│   │   ├── create-edit/
│   │   └── ranking/            # Bảng xếp hạng chi tiết của Host/Bidder
│   └── admin/                  # Màn hình kiểm duyệt phiên của Admin
└── app/
    └── [locale]/
        ├── (client)/
        │   ├── sessions/
        │   │   ├── page.tsx
        │   │   └── [id]/
        │   │       └── page.tsx
        │   └── host/
        │       ├── sessions/
        │       │   ├── page.tsx       # Danh sách quản lý của Host
        │       │   ├── new/
        │       │   │   └── page.tsx   # Trang tạo phiên mới
        │       │   └── [id]/
        │       │       ├── edit/
        │       │       │   └── page.tsx # Trang chỉnh sửa phiên
        │       │       └── ranking/
        │       │           └── page.tsx # Trang xếp hạng
        └── (admin)/
            └── admin/
                └── sessions/
                    └── page.tsx       # Duyệt phiên
```

---

## 2. Kế hoạch triển khai từng bước (Phase-by-Phase)

### Phase 1: Tạo DTO, Interface, API Services & Cài đặt Thư viện hỗ trợ

- **Cài đặt thư viện:**
  - Cài đặt `framer-motion` để hỗ trợ hiệu ứng động sắp xếp bảng xếp hạng: `pnpm add framer-motion`.
- **Interfaces (`src/interfaces/`)**:
  - Định nghĩa enums: `LoaiPhien`, `TrangThaiPhien`, `LoaiTieuChi`, `TrangThaiDeXuat`, `HuongToiUu`.
  - Thiết lập kiểu dữ liệu cho `TenderSession`, `TenderCriteria`, `TenderSubmission`, `AuctionSession`, `AuctionBid`.
- **API Services (`src/api/`)**:
  - `tender.ts`: Định nghĩa các API `createTender`, `publishTender`, `submitProposal`, `getTenderRanking`, `closeTender`.
  - `auction.ts`: Định nghĩa các API `createAuction`, `placeBid`, `getAuctionStatus`, `closeAuction`.

---

### Phase 2: Trang danh sách phiên (`/sessions`)

- **Định tuyến:** `src/app/[locale]/(client)/sessions/page.tsx` import từ `src/features/sessions/list`.
- **Giao diện (UI/UX):**
  - Thiết lập hai tab lớn: **Đấu thầu (Tenders)** và **Đấu giá (Auctions)**.
  - Bộ lọc nâng cao: Lọc theo thời gian bắt đầu/kết thúc, trạng thái phiên, khoảng giá, và ô tìm kiếm từ khóa.
  - Render danh sách dạng lưới (Grid) dùng `BaseRow`, `BaseCol`, hiển thị: Tiêu đề, Badge trạng thái, Đếm ngược thời gian kết thúc, Giá hiện tại/Gói thầu, số lượt tham gia.
- **Tích hợp API:** Gọi đồng thời `GET /tender-sessions` và `GET /auction-sessions`.

---

### Phase 3: Điều phối trang chi tiết phiên (`/sessions/:id`)

- **Định tuyến:** `src/app/[locale]/(client)/sessions/[id]/page.tsx` import từ `src/features/sessions/detail`.
- **Logic điều hướng giao diện (`src/features/sessions/detail/index.tsx`):**
  - Fetch dữ liệu phiên từ API chi tiết.
  - Nếu `session.loaiPhien === 'DAU_GIA'`, render `<AuctionDetail session={session} />`.
  - Nếu `session.loaiPhien === 'DAU_THAU'`, render `<TenderDetail session={session} />`.

---

### Phase 4: Chi tiết Đấu giá trực tuyến (`AuctionDetail.tsx`)

- **Giao diện (UI/UX):**
  - Slideshow hình ảnh tài sản đấu giá, mô tả chi tiết tài sản.
  - Bộ đếm ngược thời gian kết thúc (Countdown) đồng bộ thời gian Server.
  - Giá cao nhất hiện tại hiển thị kích thước lớn.
  - Mức giá gợi ý tiếp theo (`nextValidBid` = giá hiện tại + bước giá).
  - Ô nhập giá `BaseInput` kèm nút "Đặt giá" (`BaseButton` type="primary").
  - Danh sách lịch sử đặt giá gần nhất (ẩn danh người dùng nếu phiên yêu cầu).
  - **Bảng xếp hạng thời gian thực (Realtime Leaderboard):** Hiển thị danh sách xếp hạng những người trả giá cao nhất. Các dòng bảng sử dụng component `<motion.tr layout>` từ `framer-motion` để tự động chạy hiệu ứng trượt hoán đổi vị trí mượt mà khi thứ hạng thay đổi.
  - **Màn hình kết thúc phiên (Closed View):** Khi trạng thái là `CLOSED`, hiển thị thẻ thông báo kết quả gồm: Nhà thắng cuộc (Winner), mức giá thắng, mốc thời gian kết thúc, thẻ trạng thái thực thi hợp đồng (`Đang thanh toán`, `Đã ký hợp đồng`) và nút bấm để tải biên bản đấu giá dạng PDF.
- **Logic xử lý đặc thù:**
  - **Polling:** Thực hiện polling gọi API lấy trạng thái `GET /auction-sessions/:id/status` mỗi 3 giây khi trạng thái phiên là `MO`.
  - **Hiệu ứng sắp xếp:** Khi dữ liệu polling trả về mảng lịch sử/bảng xếp hạng mới, tự động cập nhật mảng state để kích hoạt hiệu ứng sắp xếp của `framer-motion`.
  - **Tải biên bản:** Giao tiếp API để lấy link/file biên bản đấu giá chính thức: `GET /auction-sessions/:id/report`.
  - **Đồng bộ thời gian:** Tính độ lệch `offset = serverTime - clientTime` để chạy đồng hồ đếm ngược chính xác.
  - **Bắt lỗi 409 (Tranh chấp giá):** Khi API trả về lỗi `409 Conflict`, hiện thông báo cảnh báo qua `notification.error`, tự động lấy giá mới nhất cập nhật lên giao diện và điền bước giá tiếp theo vào ô đặt giá.

---

### Phase 5: Chi tiết Đấu thầu & Form Proposal Động (`TenderDetail.tsx`)

- **Giao diện (UI/UX):**
  - Hiển thị thông tin tổng quan gói thầu, hồ sơ yêu cầu pháp lý và giá trần.
  - Bảng danh sách tiêu chí chấm điểm (Criteria Table) hiển thị rõ trọng số và hướng tối ưu.
  - Nút "Nộp hồ sơ đề xuất" mở ra một Drawer hoặc Modal chứa **Form nhập đề xuất động**.
  - **Màn hình kết thúc thầu (Closed View):** Khi trạng thái là `CLOSED`, hiển thị bảng điểm chi tiết (Technical vs Commercial score breakdown), công bố nhà thắng thầu (Winner), điểm tổng hợp cao nhất và nút "Tải biên bản mở thầu" (PDF).
- **Xây dựng Form động:**
  - Đọc danh sách các tiêu chí từ API.
  - Render Input tương ứng:
    - Loại `SO` -> `BaseInput type="number"`
    - Loại `PHAN_TRAM` -> `BaseInput type="number"` suffix `"%"`
    - Loại `DUNG_SAI` -> `BaseCheckbox` hoặc `BaseSwitch`
    - Loại `LUA_CHON` -> `BaseSelect` dropdown
    - Loại `TAI_LIEU` -> `BaseUpload` file đính kèm
- **Validation:**
  - Validate bắt buộc điền các trường `required`.
  - Kiểm tra giá đề xuất phải lớn hơn 0 và nhỏ hơn hoặc bằng giá trần gói thầu.
- **Tích hợp API:**
  - Gửi đề xuất qua `POST /tender-sessions/:id/submissions`. Hiển thị điểm số chi tiết sau khi nộp thành công.
  - Tải biên bản mở thầu: `GET /tender-sessions/:id/report`.

---

### Phase 6: Quản lý của Host (Tạo phiên, Trình dựng tiêu chí & Bảng xếp hạng)

- **Tạo/Sửa phiên (`/host/sessions/new` & `/host/sessions/:id/edit`):**
  - Form cấu hình thông tin cơ bản của phiên.
  - **Criteria Builder (Chỉ dùng cho Đấu thầu):** Giao diện cho phép Host thêm/sửa/xóa các tiêu chí kỹ thuật, thương mại và cấu hình trọng số.
  - **Validation:** Ràng buộc tổng trọng số của tất cả tiêu chí kỹ thuật + thương mại phải bằng `1` (hoặc `100%`) trước khi bấm lưu.
- **Bảng xếp hạng của Host (`/host/sessions/:id/ranking`):**
  - Giao diện bảng (`BaseTable`) xếp hạng các nhà thầu theo điểm tổng hợp giảm dần.
  - Hiển thị đầy đủ tên nhà thầu cho Host, ẩn danh đối thủ cạnh tranh nếu nhà thầu khác xem.

---

### Phase 7: Quản trị viên kiểm duyệt (`/admin/sessions`)

- **Giao diện (UI/UX):**
  - Bảng danh sách các phiên mới tạo đang chờ duyệt.
  - Hai hành động: "Phê duyệt" (Chuyển trạng thái sang `CONG_BO`) và "Từ chối" (Nhập lý do từ chối).
- **Tích hợp API:** Gửi trạng thái phê duyệt qua endpoint kiểm duyệt của Admin.
