# Base FE Next.js Professional

Bộ Base Project được tối ưu hóa cho Next.js 16 (Turbopack), tích hợp sẵn các công nghệ hiện đại, quy chuẩn phát triển chuyên nghiệp và hệ thống UI nhất quán.

## 🚀 Công nghệ sử dụng

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Package Manager**: pnpm (Quản lý package nhanh và tiết kiệm bộ nhớ)
- **UI & Styling**: Ant Design 5, Styled Components
- **i18n**: next-intl (Full support đa ngôn ngữ)
- **Data Fetching**: Axios, React Query (TanStack Query v5)
- **State Management**: Redux Toolkit
- **Animation**: DotLottie (Lottie animations cho hiệu ứng mượt mà)
- **Development Tools**: Husky, Commitlint, ESLint, Prettier

---

## 📁 Cấu trúc thư mục (Project Structure)

```text
src/
├── api/            # Định nghĩa các hàm gọi API (Services)
├── app/            # Next.js App Router (Routes & Layouts)
├── components/
│   ├── common/     # Hệ thống Base Components dùng chung toàn app
│   └── pages/      # Chứa các UI đặc thù cho từng trang/feature
├── constants/      # Các hằng số, Enums, Messages hệ thống
├── hooks/
│   └── common/     # Các custom hooks dùng chung (Feedback, Query, Responsive)
├── interfaces/     # Quản lý kiểu dữ liệu (TypeScript Interfaces)
├── i18n/           # Cấu hình đa ngôn ngữ (Routing, Middleware)
├── providers/      # Các context providers (Theme, Auth, QueryClient)
├── services/       # Cấu hình Axios, Interceptors
├── styles/         # Hệ thống Design System (Themes, Global Styles)
└── utils/          # Các hàm tiện ích (Date, Validate, Storage...)
```

---

## ✨ Hướng dẫn tạo một Feature mới

Để tạo một feature (ví dụ: `Product`), hãy tuân thủ cấu trúc thư mục từ folder `demo` mẫu:

### 1. Tạo UI Component trong `src/pages/product`

Chia nhỏ logic để dễ quản lý:

- `index.tsx`: Chứa cấu trúc giao diện chính (UI Template).
- `index.hooks.ts`: Chứa logic nghiệp vụ liên quan đến API (sử dụng Queries/Mutations).
- `index.utils.ts` / `index.utils.tsx`:
  - Quản lý các state cục bộ (useState) cho UI.
  - Chứa các hàm xử lý sự kiện (event handlers).
  - Các hàm format dữ liệu riêng cho trang.
  - Các sub-components nhỏ chỉ dùng riêng cho page này.
- `index.styles.ts`: Định nghĩa các Styled Components.

### 2. Đăng ký Page trong `src/app/[locale]/product/page.tsx`

Import Component từ thư mục `pages` và render.

---

## 🎨 Hệ thống Base Components & Design System

Bắt buộc sử dụng các component tiền tố **`Base`** trong `src/components/common` thay vì gọi trực tiếp từ `antd`.

### Danh sách Base Components:

- **Layout**: `BaseFlex`, `BaseRow`, `BaseCol`, `BaseSpace`, `BaseDivider`.
- **Form/Input**: `BaseInput`, `BaseSelect`, `BaseDatePicker`, `BaseCheckbox`, `BaseRadio`, `BaseForm`.
- **Custom Inputs**:
  - `InputPassword`: Input mật khẩu có icon ẩn/hiện.
  - `SearchInput`: Input tìm kiếm tích hợp debounce.
  - `VerificationCodeInput`: Nhập mã OTP/Code.
  - `ClipboardInput`: Click để copy nội dung.
- **Display**: `BaseTable`, `BaseCard`, `BaseBadge`, `BaseTag`, `BaseTooltip`.
- **Feedback**: `BaseModal`, `BaseDrawer`, `BaseResult`, `BaseSpin`, `DeleteModal`.

### Tùy biến Design System (Colors)

Để thay đổi màu sắc mà không làm vỡ hệ thống:

1. Chỉnh sửa tại `src/styles/themes/light/index.ts`.
2. Hệ thống sẽ tự động map các mã màu này vào Ant Design Token thông qua `theme.config.tsx`.
3. Khi viết CSS (Styled Components), sử dụng biến theme:
   ```tsx
   color: ${(props) => props.theme.primary};
   background: ${(props) => props.theme.background};
   ```

---

## 📞 Quy chuẩn gọi API

Định nghĩa API trong thư mục `src/api` theo từng module.

### 1. Định nghĩa API (`src/api/demo.ts`):

```typescript
import { ResponseData } from "@/interfaces";
import { request } from "@/services/axios";

export const getDemoData = () =>
  request.get<undefined, ResponseData<any>>("/endpoint-url");
```

### 2. Sử dụng trong Component (Hooks):

Sử dụng các hook wrapper trong `src/hooks/common`:

- `useAppQuery`: Cho các thao tác lấy dữ liệu (GET).
- `useAppMutation`: Cho các thao tác thay đổi dữ liệu (POST, PUT, DELETE).

---

## 🛠 Hooks & Utilities hỗ trợ

### Custom Hooks (`src/hooks/common`)

- `useFeedback`: Một object chứa `notification`, `message`, `modal` đã được cấu hình sẵn style của base. Tránh dùng trực tiếp từ antd.
- `useResponsive`: Trả về thông tin breakpoint hiện tại (isMobile, isTablet, isDesktop).
- `useErrorHandler`: Tự động xử lý và hiển thị lỗi từ API.

### Thư viện Utils (`src/utils`)

- `date.ts`: Các hàm format ngày tháng dùng `dayjs`.
- `validate.ts`: Các quy tắc validate form common (Email, Phone, Password...).
- `cookie.ts`: Quản lý cookie (get/set/remove).
- `table.ts`: Helper xử lý phân trang, sort cho BaseTable.

---

## 📏 Quy chuẩn Code (Coding Standards)

1. **Arrow Function**: Luôn sử dụng cú pháp Arrow Function cho mọi component và function.
2. **No Inline Comments**: Không viết comment lặp lại logic code. Giải thích ý đồ qua tên hàm/biến rõ ràng.
3. **Common First**: Luôn kiểm tra xem component/utility đã có sẵn trong dự án chưa trước khi viết mới.
4. **i18n**: Mọi text hiển thị cho người dùng phải được đưa vào file `messages/*.json` và dùng qua `useTranslations`.

---

## 📦 Lệnh phát triển

- `pnpm dev`: Chạy môi trường phát triển (Port 3333).
- `pnpm build`: Kiểm tra Lint và Build production.
- `pnpm start`: Chạy bản build production (Port 3000).
- `pnpm lint:check`: Kiểm tra lỗi code.
- `pnpm format`: Tự động định dạng code theo Prettier.
