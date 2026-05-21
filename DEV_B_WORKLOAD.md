# Kế hoạch công việc - DEV B: Đấu thầu (Tender), Quản lý của Host & Admin

Hồ sơ công việc này tập trung vào luồng Đấu thầu, xử lý form nhập liệu động theo tiêu chí chấm điểm, và các màn hình quản lý dành cho Host và Admin.
Tất cả các thư mục và tập tin dưới đây được thiết kế riêng biệt để đảm bảo không bị xung đột code với DEV A.

---

## 1. Bản đồ thư mục & Tập tin đảm trách (Chỉ DEV B chỉnh sửa)

```text
src/
├── api/
│   └── tender.ts               <-- Dịch vụ kết nối API Đấu thầu
├── interfaces/
│   └── tender.ts               <-- Kiểu dữ liệu (Types) Đấu thầu
└── app/
    └── [locale]/
        ├── (client)/
        │   ├── tenders/        <-- Trang chi tiết Đấu thầu
        │   │   └── [id]/
        │   │       └── page.tsx
        │   └── host/           <-- Quản lý của Host (Tạo phiên, Builder, Xếp hạng)
        │       ├── sessions/
        │       │   ├── new/
        │       │   │   └── page.tsx
        │       │   └── [id]/
        │       │       ├── edit/
        │       │       │   └── page.tsx
        │       │       └── ranking/
        │       │           └── page.tsx
        │       └── page.tsx
        └── (admin)/
            └── admin/          <-- Kiểm duyệt của Admin
                └── sessions/
                    └── page.tsx
```

---

## 2. Các màn hình & Route cần phát triển

- `/tenders/:id`: Chi tiết phiên đấu thầu và nộp proposal (tách biệt hoàn toàn với trang chi tiết đấu giá `/auctions/:id` của DEV A).
- `/host/sessions/new` & `/host/sessions/:id/edit`: Giao diện tạo mới / chỉnh sửa phiên đấu thầu/đấu giá của Host.
- `/host/sessions/:id/ranking`: Bảng xếp hạng điểm số đấu thầu dành cho Host và các Bidder.
- `/admin/sessions`: Giao diện kiểm duyệt và quản trị phiên dành cho Admin.

---

## 3. Chi tiết công việc cụ thể

### 3.1 Định nghĩa DTO & API Client

- **Tạo file định nghĩa kiểu dữ liệu:**
  - `src/interfaces/tender.ts`
  - Định nghĩa các enum và interface: `TenderSession`, `TenderCriteria`, `TenderSubmission`, `LoaiTieuChi`, `TrangThaiPhien`, `HuongToiUu`.
- **Tạo file API Client:**
  - `src/api/tender.ts`
  - Sử dụng helper `request` từ `@/services/axios` để viết các hàm kết nối:
    - Tạo phiên đấu thầu: `POST /tender-sessions`
    - Kích hoạt phiên: `POST /tender-sessions/:id/publish`
    - Nộp hồ sơ đề xuất (proposal): `POST /tender-sessions/:id/submissions`
    - Lấy bảng xếp hạng: `GET /tender-sessions/:id/ranking`
    - Đóng phiên đấu thầu: `POST /tender-sessions/:id/close`

### 3.2 Chi tiết Đấu thầu (`/tenders/:id`)

- **Yêu cầu UI:**
  - Định tuyến: `src/app/[locale]/(client)/tenders/[id]/page.tsx`
  - **Thông tin gói thầu:** Tiêu đề, mô tả, giá trần (`giaToiDa`), chủ sở hữu, thời gian đóng thầu.
  - **Bảng tiêu chí kỹ thuật (Criteria Table):**
    - Danh sách các tiêu chí chấm điểm: Tên tiêu chí, Nhóm (Kỹ thuật/Thương mại), Trọng số, Hướng tối ưu (Cao hơn/Thấp hơn).
  - **Nút hành động (CTA):** "Nộp hồ sơ đề xuất" (chỉ hiện khi trạng thái là `OPEN`).
- **Dịch thuật (i18n):**
  - Chỉ sử dụng và định nghĩa các key dịch thuật bên dưới namespace `"tender"` trong `vi.json` và `en.json`.

### 3.3 Form Đăng ký Proposal Động (Dynamic Form)

- **Yêu cầu UI:**
  - Form được xây dựng động dựa trên danh sách tiêu chí (`tieuChi` từ API chi tiết phiên).
  - Ánh xạ Input tương ứng với loại tiêu chí (`loai`):
    - `SO` -> `BaseInput type="number"`
    - `PHAN_TRAM` -> `BaseInput type="number"` kèm suffix `%`
    - `DUNG_SAI` -> `BaseCheckbox` hoặc `BaseSwitch`
    - `LUA_CHON` -> `BaseSelect` dropdown
    - `TAI_LIEU` -> `BaseUpload` để người dùng tải file lên
  - Trường nhập "Giá đề xuất" (`giaDeXuat`) là bắt buộc ở mọi hồ sơ đề xuất.
- **Client validation:**
  - Kiểm tra các trường bắt buộc (`batBuoc: true`).
  - Kiểm tra `giaDeXuat` phải lớn hơn 0 và không được vượt quá giá trần `giaToiDa` của phiên.
  - Kiểm tra giá trị nhập vào nằm trong khoảng `giaTriToiThieu` và `giaTriToiDa` (nếu có).
- **Tích hợp BE:**
  - Gửi đề xuất qua: `POST /tender-sessions/:id/submissions`.
  - Body mẫu: `{ giaDeXuat: number, cacGiaTri: Array<{ maTieuChi: string, giaTri: any }> }`.
  - Nhận về kết quả điểm số (`diemKyThuat`, `diemGia`, `diemTongHop`, `thuHang`) và hiển thị kết quả chi tiết cho người dùng sau khi nộp thành công.

### 3.4 Bảng xếp hạng Đấu thầu (`/host/sessions/:id/ranking`)

- **Yêu cầu UI:**
  - Giao diện bảng (`BaseTable`) hiển thị xếp hạng.
  - Cột gồm: Thứ hạng (Rank), Tên/Biệt danh người tham gia, Điểm kỹ thuật, Điểm giá, Điểm tổng hợp, Trạng thái.
- **Phân quyền hiển thị:**
  - Nếu là **Host/Admin**: Hiển thị tên thật của nhà thầu.
  - Nếu là **Bidder (Nhà thầu)**: Chỉ hiển thị tên thật của chính họ, các đối thủ cạnh tranh khác hiển thị dưới dạng biệt danh ẩn danh (`Bidder A`, `Bidder B`).
- **Tích hợp BE:**
  - API: `GET /tender-sessions/:id/ranking` (Thực hiện polling 10 giây/lần).

### 3.5 Quản lý của Host (Tạo phiên & Bảng tiêu chí)

- **Giao diện tạo mới phiên (`/host/sessions/new`):**
  - Form nhập thông tin cơ bản: Tiêu đề, mô tả, giá trần/giá khởi điểm, thời gian bắt đầu/kết thúc.
  - **Trình dựng tiêu chí (Criteria Builder):**
    - Cho phép Host thêm/sửa/xóa các tiêu chí động.
    - Nhập: Tên tiêu chí, mã, loại (`SO`, `LUA_CHON`...), trọng số, hướng tối ưu.
    - Validate phía Client: Tổng trọng số các tiêu chí phải bằng `1` (hoặc `100%`) trước khi cho phép lưu phiên.
- **Dịch thuật (i18n):**
  - Chỉ sử dụng và định nghĩa các key dịch thuật bên dưới namespace `"host"` trong `vi.json` và `en.json`.

### 3.6 Giao diện Admin (`/admin/sessions`)

- **Yêu cầu UI:**
  - Danh sách toàn bộ các phiên trên hệ thống chờ phê duyệt.
  - Nút "Phê duyệt" (Approve) và "Từ chối" (Reject) kèm ô nhập lý do từ chối.
- **Dịch thuật (i18n):**
  - Chỉ sử dụng và định nghĩa các key dịch thuật bên dưới namespace `"admin"` trong `vi.json` và `en.json`.
