# Agent Coding Rules & Guidelines (AGENT.md)

Tài liệu này định nghĩa các quy tắc cốt lõi mà AI Agent phải tuân thủ nghiêm ngặt trong suốt quá trình phát triển dự án.

## Quy tắc cốt lõi (Core Rules)

1. **Luôn hỏi ý kiến trước khi sửa code**:
   - Tuyệt đối không tự ý chỉnh sửa code khi chưa giải thích sự hiểu biết của mình, đề xuất giải pháp chi tiết và nhận được sự xác nhận (confirm) từ người dùng.

2. **Tư duy chia nhỏ Component & Cấu trúc thư mục (Folder Structure)**:
   - Không đưa quá nhiều logic vào trong một file duy nhất. Chia nhỏ component để dễ tái sử dụng và bảo trì.
   - **`index.tsx` (hoặc view chính)**: Chỉ chứa cấu trúc hiển thị UI và gọi hooks/components con.
   - **`index.hooks.ts`**: Nơi chứa toàn bộ logic về gọi API (như React Query hooks, Fetching...).
   - **`index.utils.ts`**: Nơi chứa các hàm xử lý API, logic quản lý state phức tạp, dữ liệu khởi tạo (init data), các cấu hình Antd component (như menu items, table columns, form rules...).
   - **`index.styles.ts`**: Chứa toàn bộ CSS/styled-components. Ưu tiên sử dụng giá trị từ hệ thống Theme (colors, fontSize, borderRadius, fontWeight, breakpoints...).

3. **Hạn chế kiểu dữ liệu `any`**:
   - Sử dụng TypeScript nghiêm ngặt. Hạn chế sử dụng `any` ở mức tối đa, không lạm dụng và phải định nghĩa type/interface rõ ràng cho dữ liệu.

4. **Quy tắc về Comment**:
   - Không viết comment thừa thãi hoặc giải thích code đơn giản.
   - Chỉ được phép viết comment cho các phần logic đặc biệt phức tạp hoặc comment tạm thời (như `TODO`, `FIXME`) để đánh dấu cần sửa đổi sau này.

5. **Không hardcode chuỗi ký tự (Hardcoded Text)**:
   - Luôn sử dụng hệ thống đa ngôn ngữ (i18n) cho text hiển thị.
   - Chỉ được dùng text thô trong `console.log` để debug tạm thời, và các dòng debug này phải được xóa bỏ hoàn toàn trước khi hoàn thành task.

6. **Ưu tiên Base Components & Hạn chế Shadow**:
   - Luôn ưu tiên import và sử dụng các Base Components có sẵn trong thư mục `src/components/common` thay vì import trực tiếp từ Ant Design.
   - Hạn chế tối đa việc tùy biến styles sử dụng `box-shadow` để giữ thiết kế phẳng, hiện đại và đồng bộ.

7. **Tính trung thực & Quản lý rủi ro**:
   - Tuyệt đối không bịa đặt thông tin. Chỉ đưa ra câu trả lời hoặc viết code dựa trên thông tin chắc chắn trong dự án.
   - Khi có rủi ro hoặc điểm mơ hồ (ambiguity) trong thiết kế/logic, phải thông báo rõ ràng cho người dùng biết, không im lặng và chủ động đề xuất giải pháp xử lý.
