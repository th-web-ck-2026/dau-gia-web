# Đặc tả chi tiết Giao diện người dùng (UI/UX Mockup Specification)

Tài liệu này mô phỏng chi tiết bố cục, các component của Ant Design và hành vi tương tác trên giao diện của từng màn hình chính trong hệ thống để hỗ trợ quá trình triển khai UI/UX chính xác.

---

## 1. Màn hình danh sách phiên (`/sessions`)

Giao diện hiển thị danh sách tất cả các phiên đấu thầu và đấu giá hoạt động công khai.

```text
+---------------------------------------------------------------------------------+
|  [ ĐẤU THẦU (Tenders) ]                      [ ĐẤU GIÁ (Auctions) ]             | (BaseTabs)
+---------------------------------------------------------------------------------+
|  [ Tìm kiếm...   ] [ Trạng thái: Tất cả v ] [ Khoảng giá: Từ - Đến ] [ Tìm kiếm]| (Filter Panel)
+---------------------------------------------------------------------------------+
|  +-----------------------------------+   +-----------------------------------+  |
|  | Đấu thầu: Mua sắm trang bị y tế   |   | Đấu giá: Đồng hồ Rolex Submariner |  | (Session Cards)
|  | [ ĐANG MỞ ]          Thời hạn: 2d |   | [ ĐANG MỞ ]         Còn lại: 02h  |  |
|  | Giá trần: 1.000.000.000 đ         |   | Giá hiện tại: 255.000.000 đ       |  |
|  | Người tham gia: 8 nhà thầu        |   | Lượt đặt giá: 14 lượt             |  |
|  |                                   |   |                                   |  |
|  | [ Xem chi tiết ]                  |   | [ Đặt giá ngay ]                  |  |
|  +-----------------------------------+   +-----------------------------------+  |
+---------------------------------------------------------------------------------+
```

### Các component Ant Design sử dụng:

- **BaseTabs (Thanh chuyển đổi):** Để chuyển qua lại giữa chế độ Đấu thầu và Đấu giá.
- **BaseInput (Tìm kiếm):** Tích hợp icon Search để lọc theo từ khóa.
- **BaseSelect (Lọc trạng thái):** Dropdown hiển thị các trạng thái: _Đang mở (Open), Sắp diễn ra (Published), Đã đóng (Closed)_.
- **BaseCard (Thẻ phiên):** Mỗi phiên hiển thị dưới dạng card, sử dụng `BaseBadge` để thể hiện trạng thái (màu xanh lá cho Đang mở, màu cam cho Sắp diễn ra, màu xám cho Đã đóng).

---

## 2. Màn hình chi tiết đấu thầu (`/sessions/:id` khi loại là `DAU_THAU`)

Bố cục chia thành 2 cột chính để tối ưu hóa không gian hiển thị trên màn hình máy tính (Responsive về 1 cột trên Mobile).

```text
+---------------------------------------------------------------------------------+
|  HỆ THỐNG ĐẤU THẦU > CHI TIẾT PHIÊN #TEN-001                                    |
|  MUA SẮM THIẾT BỊ Y TẾ BỆNH VIỆN ĐA KHOA                                         |
|  Trạng thái: [ ĐANG MỞ ] | Hạn chót: 25/05/2026 17:00 (Countdown: 2 ngày 4 giờ)  |
+---------------------------------------------------------------------------------+
|  CỘT TRÁI (60% - Thông tin chung)      | CỘT PHẢI (40% - Tiêu chí đánh giá)     |
|  - Chủ đầu tư: Bệnh viện Đa Khoa       |                                        |
|  - Mô tả gói thầu: Mua sắm đồng bộ...  | BẢNG TIÊU CHÍ CHẤM ĐIỂM:               |
|  - Giá gói thầu tối đa: 1.000.000.000 đ| +--------------+---------+-----------+ |
|  - Hồ sơ pháp lý yêu cầu:              | | Tiêu chí     | Loại    | Trọng số  | |
|    + Giấy phép kinh doanh y tế.        | +--------------+---------+-----------+ |
|    + Chứng chỉ ISO 9001.               | | Kinh nghiệm  | Số      | 40%       | |
|                                        | | Doanh thu    | Số      | 30%       | |
|  [ Nộp hồ sơ đề xuất ]                 | | Cam kết bảo  | Đúng/Sai| 30%       | |
|  (Bấm mở Drawer nộp bài)               | +--------------+---------+-----------+ |
+---------------------------------------------------------------------------------+
```

### Các component Ant Design sử dụng:

- **BaseRow & BaseCol:** Chia tỷ lệ màn hình `lg={14}` cho phần thông tin chung và `lg={10}` cho bảng tiêu chí.
- **BaseTable:** Hiển thị thông tin tiêu chí chấm điểm khoa học, rõ ràng.
- **BaseButton (CTA):** Nút nộp hồ sơ màu xanh dương nổi bật (chỉ mở ra Drawer khi trạng thái là `MO`).

---

## 3. Drawer nộp hồ sơ đấu thầu động (Dynamic Proposal Form)

Khi bấm "Nộp hồ sơ đề xuất", một **AntD Drawer** trượt ra từ bên phải màn hình.

```text
+-----------------------------------------------------+
|  Nộp hồ sơ đề xuất gói thầu                         |
+-----------------------------------------------------+
|  * Giá đề xuất cung cấp (VND):                      |
|  [ 900.000.000                   ]                  | (BaseInput)
|                                                     |
|  * Kinh nghiệm (Số hợp đồng đã hoàn thành):         |
|  [ 3                   ] hợp đồng                   | (BaseInput type="number")
|                                                     |
|  * Cam kết bảo hành chính hãng (Đúng/Sai):          |
|  (o) Đúng     ( ) Sai                               | (BaseRadio)
|                                                     |
|  * Giấy phép kinh doanh (Tải tài liệu dạng PDF):    |
|  [ + Upload File PDF ]                              | (BaseUpload)
|                                                     |
|  -------------------------------------------------  |
|  [ Hủy bỏ ]                      [ Nộp hồ sơ đề xuất]|
+-----------------------------------------------------+
```

### Các component Ant Design sử dụng:

- **BaseDrawer:** Đảm bảo form nhập không đè hoàn toàn trang chi tiết, giúp người dùng dễ đối chiếu thông tin bên dưới.
- **BaseForm & BaseFormItem:** Thực hiện validate phía client (bắt buộc nhập, giá trị số không âm, kiểm tra định dạng file tải lên).

---

## 4. Màn hình đấu giá trực tuyến (`/sessions/:id` khi loại là `DAU_GIA`)

Thiết kế tập trung vào sự biến động thời gian thực (Realtime Board) để kích thích hành vi đặt giá.

```text
+---------------------------------------------------------------------------------+
|  MUA TÀI SẢN THANH LÝ: ĐỒNG HỒ ROLEX SUBMARINER #AUC-001                        |
|  [ ĐANG MỞ ] | Thời gian còn lại: [ 01:24:05 ] (Countdown chớp đỏ khi dưới 5p)  |
+---------------------------------------------------------------------------------+
|  CỘT TRÁI (50% - Thông tin tài sản)    | CỘT PHẢI (50% - Bảng điều khiển giá)   |
|  +----------------------------------+  | +------------------------------------+ |
|  |                                  |  | | GIÁ CAO NHẤT HIỆN TẠI              | |
|  |           ẢNH TÀI SẢN            |  | | 255.000.000 đ                      | |
|  |                                  |  | | Người dẫn đầu: User A (Bạn) [✔️]   | |
|  +----------------------------------+  | +------------------------------------+ |
|  - Giá khởi điểm: 250.000.000 đ      |  | ĐẶT MỨC GIÁ MỚI: [ 260.000.000 ] đ   | |
|  - Bước giá: 5.000.000 đ            |  | [ ĐẶT GIÁ NGAY ]                     | |
|  - Mô tả: Nguyên hộp, bảo hành...    |  |                                      | |
|                                        |  | BẢNG XẾP HẠNG REALTIME (Cup vàng/bạc)| |
|                                        |  | 🥇 Hạng 1: User A | 255.000.000 đ   | |
|                                        |  | 🥈 Hạng 2: User B | 250.000.000 đ   | |
+---------------------------------------------------------------------------------+
```

### Các component Ant Design và thư viện sử dụng:

- **BaseCard (Thẻ giá cao nhất):** Sơn nền màu primary nhạt, font chữ giá to đậm màu trắng/nổi bật để dễ quan sát.
- **BaseAlert:** Hiển thị thông báo trạng thái tức thì: _"Bạn đang dẫn đầu"_ (Màu xanh lá) hoặc _"Có người đã trả giá cao hơn bạn"_ (Màu đỏ/cam).
- **BaseTable / BaseList (Bảng xếp hạng realtime):** Hiển thị danh sách xếp hạng.
- **Framer Motion (`<motion.tr layout>`):** Sử dụng cho từng hàng của bảng xếp hạng để tự động chạy hiệu ứng trượt hoán đổi vị trí mượt mà khi thứ hạng thay đổi.

---

## 5. Trình dựng tiêu chí đấu thầu của Host (Criteria Builder)

Giao diện thiết lập các tiêu chí động nằm trong trang tạo phiên đấu thầu.

```text
+---------------------------------------------------------------------------------+
|  TRÌNH DỰNG TIÊU CHÍ CHẤM ĐIỂM (Criteria Builder)                               |
+---------------------------------------------------------------------------------+
|  +---------------------------------------------------------------------------+  |
|  | Tên tiêu chí   | Loại tiêu chí  | Trọng số (%) | Hướng tối ưu | Hành động |  |
|  +---------------------------------------------------------------------------+  |
|  | [Kinh nghiệm ] | [ Số        v] | [ 40 ] %     | [ Cao hơn v] | [ Xóa ]   |  |
|  | [Doanh thu   ] | [ Số        v] | [ 30 ] %     | [ Cao hơn v] | [ Xóa ]   |  |
|  | [Chứng chỉ   ] | [ Tài liệu  v] | [ 30 ] %     | [ -        ] | [ Xóa ]   |  |
|  +---------------------------------------------------------------------------+  |
|  [ + Thêm tiêu chí mới ]                                                        |
+---------------------------------------------------------------------------------+
|  [⚠️ Warning: Tổng trọng số hiện tại là 100%. Đã hợp lệ để lưu phiên]          |
+---------------------------------------------------------------------------------+
```

### Các component Ant Design sử dụng:

- **BaseForm.List / Array Fields:** Cho phép người dùng thêm dòng động.
- **BaseAlert (Warning Banner):** Hiện cảnh báo màu vàng khi tổng trọng số khác 100% (hoặc khác 1.0) và chuyển xanh lá khi đạt đủ 100%.

---

## 6. Bảng xếp hạng thầu (`/host/sessions/:id/ranking`)

Trang hiển thị xếp hạng chi tiết sau chấm điểm cho Host và các nhà thầu.

```text
+---------------------------------------------------------------------------------+
|  BẢNG XẾP HẠNG HỒ SƠ ĐỀ XUẤT - GÓI THẦU #TEN-001                                |
+---------------------------------------------------------------------------------+
|  +------+---------------+------------------+---------------+-----------------+  |
|  | Hạng | Nhà thầu      | Điểm Kỹ thuật    | Điểm Thương mại| Điểm tổng hợp   |  |
|  +------+---------------+------------------+---------------+-----------------+  |
|  | 1    | Nhà thầu A    | 92.5             | 95.0          | 93.5 (Winner)   |  |
|  | 2    | Bidder XYZ(*) | 88.0             | 85.0          | 86.8            |  |
|  | 3    | Bidder MNP(*) | 50.0 (Ngưỡng tối)| 90.0          | 66.0            |  |
|  +------+---------------+------------------+---------------+-----------------+  |
+---------------------------------------------------------------------------------+
|  (*) Tên nhà thầu khác được ẩn danh bằng biệt danh đối với tài khoản Bidder.    |
+---------------------------------------------------------------------------------+
```

### Các component Ant Design sử dụng:

- **BaseTable:** Cấu hình sắp xếp (sorting) tự động theo cột `Điểm tổng hợp`.
- **BaseTag:** Để đánh dấu nổi bật trạng thái của nhà thầu đứng đầu (`Winner` - Tag màu đỏ hoặc vàng kim).

---

## 7. Màn hình Kết quả & Biên bản sau khi kết thúc (Closed State View)

Hiển thị khi phiên đấu giá/đấu thầu đã đóng (`CLOSED`). Cho phép tải biên bản và xem trạng thái thực thi hợp đồng.

```text
+---------------------------------------------------------------------------------+
|  KẾT QUẢ PHIÊN ĐÃ HOÀN THÀNH - #TEN-001                                         |
+---------------------------------------------------------------------------------+
|  +---------------------------------------------------------------------------+  |
|  | [✔️] NHÀ THẮNG THẦU: Nhà thầu A                                            |  |
|  | - Mức giá/điểm thắng thầu: 93.5 điểm                                      |  |
|  | - Thời điểm đóng phiên: 25/05/2026 17:00                                  |  |
|  | - Trạng thái thực thi: [ ĐANG KÝ HỢP ĐỒNG ]                               |  | (BaseTag)
|  +---------------------------------------------------------------------------+  |
|                                                                                 |
|  BẢNG ĐIỂM CHI TIẾT (Scoring Breakdown):                                        |
|  +----------------------+--------------------+--------------------+----------+  |
|  | Chỉ số đánh giá      | Điểm Kỹ thuật (70%)| Điểm Thương mại(30%)| Tổng điểm|  |
|  +----------------------+--------------------+--------------------+----------+  |
|  | Nhà thầu A (Winner)  | 92.5               | 95.0               | 93.5     |  |
|  +----------------------+--------------------+--------------------+----------+  |
|                                                                                 |
|  [ Tải Biên Bản Đấu Thầu (PDF) ]                                                | (BaseButton)
+---------------------------------------------------------------------------------+
```

### Các component Ant Design sử dụng:

- **BaseCard:** Bọc phần thông tin nhà thắng cuộc bằng viền nổi bật (Border Highlight).
- **BaseButton (Icon Download):** Nút tải biên bản dạng file PDF có icon tải xuống.
- **BaseTag:** Hiển thị trạng thái thanh toán/ký hợp đồng (Ví dụ: `Đang thanh toán`, `Đã ký hợp đồng`, `Hủy hợp đồng`).
