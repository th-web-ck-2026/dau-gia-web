# Tài Liệu Module Auth (Authentication Module)

Module `Auth` chịu trách nhiệm quản lý toàn bộ quá trình xác thực và phân quyền của người dùng trong hệ thống. Module này hỗ trợ đăng nhập qua Email/Mật khẩu và Google (OAuth2), đồng thời quản lý phiên đăng nhập (sessions) và mã thông báo bảo mật (JWT Tokens).

## 1. Tổng Quan Kiến Trúc

Module được xây dựng theo kiến trúc MVC của NestJS, bao gồm các thành phần chính:
- **Controllers**: Xử lý các HTTP requests liên quan đến xác thực.
- **Services**: Chứa logic nghiệp vụ chính (đăng nhập, đăng ký, quên mật khẩu, quản lý session).
- **Strategies**: Triển khai Passport strategy (JWT) để bảo vệ các routes.
- **Repositories & Models**: Giao tiếp với cơ sở dữ liệu (Sequelize) để lưu trữ thông tin nhà cung cấp xác thực (`AuthProvider`) và phiên đăng nhập (`AuthSession`).

## 2. Các Thành Phần Chính

### 2.1. Controllers (`AuthController`)
Cung cấp các API endpoint (tất cả đều public, trừ khi được bảo vệ bởi Guard toàn cục):
- `POST /auth/register`: Đăng ký tài khoản mới bằng email và mật khẩu.
- `POST /auth/login?provider={email|google}`: Đăng nhập. Hỗ trợ 2 provider:
  - `email`: Cần `email` và `password`.
  - `google`: Cần `idToken` từ Google.
- `POST /auth/refresh`: Cấp lại Access Token mới bằng Refresh Token.
- `POST /auth/forgot-password`: Yêu cầu gửi email đặt lại mật khẩu (có Rate Limiting: 1 request / 1 phút).
- `POST /auth/reset-password/token`: Đặt lại mật khẩu sử dụng token từ email.
- `POST /auth/logout`: Đăng xuất khỏi thiết bị hiện tại (xóa session tương ứng với Refresh Token).
- `POST /auth/logout-all`: Đăng xuất khỏi tất cả các thiết bị.
- `POST /auth/change-password`: Thay đổi mật khẩu (yêu cầu mật khẩu cũ).

### 2.2. Services

#### `AuthService`
Service trung tâm điều phối các luồng xác thực:
- **Đăng ký (`register`)**: Kiểm tra email/phone trùng lặp, băm (hash) mật khẩu và tạo user mới cùng với `AuthProvider`.
- **Đăng nhập (`login`)**: Định tuyến đến `handleEmailLogin` hoặc `handleGoogleLogin` dựa trên provider. Tạo Access Token và Refresh Token, sau đó lưu session.
- **Refresh Token (`refresh`)**: Kiểm tra tính hợp lệ của session, xoay vòng (rotate) Refresh Token để tăng tính bảo mật.
- **Quản lý mật khẩu**: Chứa các hàm `forgotPassword` (tạo token và gửi email), `resetPassword`, và `changePassword`.
- **Đăng xuất**: Xóa session dựa trên Refresh Token hoặc xóa tất cả sessions của user.

#### `AuthProviderService`
Quản lý các phương thức đăng nhập của người dùng:
- Lưu trữ thông tin định danh tùy thuộc vào provider (Email/Password hoặc Google ID).
- Sử dụng thư viện `google-auth-library` để xác thực `idToken` của Google.
- Xác thực mật khẩu bằng `bcrypt`.

#### `AuthSessionService`
Quản lý các phiên đăng nhập để hỗ trợ đa thiết bị:
- Khi người dùng đăng nhập, một session mới được tạo với `deviceInfo` (phân tích từ User-Agent), `ipAddress`, và `refreshToken` (được băm).
- Cung cấp các hàm xóa session khi đăng xuất hoặc thu hồi toàn bộ session.

### 2.3. Strategies (`JwtStrategy`)
Sử dụng `passport-jwt` để xác thực Access Token cho các requests yêu cầu quyền truy cập:
- Trích xuất token từ header `Authorization: Bearer <token>`.
- Giải mã và xác minh chữ ký dựa trên `jwt.secret`.
- Kiểm tra người dùng có tồn tại trong cơ sở dữ liệu không và trạng thái tài khoản có bị khóa (`blocked`) hay không.

### 2.4. Models & Repositories
- **`AuthProviderModel`**: Bảng lưu trữ liên kết giữa User và Provider (ví dụ: Google Subject ID hoặc mật khẩu băm của Email).
- **`AuthSessionModel`**: Bảng lưu trữ các Refresh Token đang hoạt động, thông tin thiết bị (IP, User-Agent) và thời gian hết hạn để kiểm soát các thiết bị đang đăng nhập.

## 3. Luồng Hoạt Động (Workflows)

### 3.1. Luồng Đăng Nhập Email/Password
1. Client gửi `email` và `password` đến `/auth/login?provider=email`.
2. `AuthService` gọi `AuthProviderService.verifyEmailPassword` để kiểm tra thông tin.
3. Nếu hợp lệ, hệ thống kiểm tra trạng thái tài khoản.
4. Tạo `accessToken` (JWT) và `refreshToken` (UUID).
5. Lưu `refreshToken` (đã băm), IP và Device Info vào bảng `AuthSession`.
6. Trả về `access_token`, `refresh_token` và thông tin người dùng cơ bản.

### 3.2. Luồng Đăng Nhập Google (OAuth2)
1. Client nhận `idToken` từ Google SDK và gửi đến `/auth/login?provider=google`.
2. `AuthProviderService` xác thực `idToken` bằng `google-auth-library`.
3. Kiểm tra xem `googleSub` đã tồn tại trong `AuthProvider` hay chưa:
   - Nếu chưa: Kiểm tra email. Nếu email đã tồn tại, liên kết tài khoản Google. Nếu email chưa tồn tại, tự động tạo User mới và liên kết.
   - Nếu đã có: Lấy thông tin User tương ứng.
4. Tạo token và lưu session tương tự luồng Email/Password.

### 3.3. Luồng Refresh Token (Rotate Token)
1. Access Token hết hạn, Client gửi Refresh Token đến `/auth/refresh`.
2. `AuthSessionService` băm token và tìm kiếm trong cơ sở dữ liệu.
3. Nếu token hợp lệ và chưa hết hạn, session cũ sẽ bị xóa (rotate).
4. Hệ thống cấp một `accessToken` mới và một `refreshToken` hoàn toàn mới.
5. Lưu session mới và trả về cho Client.

## 4. Bảo Mật & Best Practices
- **Băm Mật Khẩu & Token**: Mật khẩu người dùng và Refresh Token trong DB đều được băm (hash) để ngăn ngừa rò rỉ nếu database bị xâm nhập.
- **Refresh Token Rotation**: Mỗi khi sử dụng Refresh Token để lấy Access Token mới, Refresh Token cũ sẽ bị hủy và thay bằng token mới, giúp giảm thiểu rủi ro bị đánh cắp token.
- **Rate Limiting**: API `/auth/forgot-password` được giới hạn (Throttled) để tránh tấn công Spam Email.
- **Kiểm Tra Trạng Thái User**: `JwtStrategy` kiểm tra trạng thái tài khoản trên mỗi request (hoặc định kỳ) để chặn ngay lập tức người dùng bị khóa (`blocked`).

## 5. Cấu Hình Biến Môi Trường (.env)
Module Auth yêu cầu các cấu hình sau trong file môi trường:
- `GOOGLE_CLIENT_ID`: Client ID của Google OAuth2.
- `PASSWORD_RESET_TOKEN_EXPIRES_IN_MINUTES`: Thời gian sống của token quên mật khẩu (phút).
- Khối cấu hình JWT (`jwt.secret`, `jwt.expiresIn`, `jwt.refreshExpiresIn`).

## 6. Hướng Dẫn Tích Hợp Dành Cho Frontend (Web/Mobile)

Phần này cung cấp các ví dụ thực tế giúp Frontend (FE) tích hợp với các API của module Auth.

### 6.1. Đăng Nhập Bằng Email và Mật Khẩu

Khi người dùng nhấn đăng nhập, FE gọi API `POST /auth/login?provider=email`.

**Request:**
```javascript
const login = async (email, password) => {
  const response = await fetch('https://api.yourdomain.com/auth/login?provider=email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (response.ok) {
    // Lưu token vào LocalStorage (hoặc Cookie)
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  } else {
    console.error('Đăng nhập thất bại:', data.message);
  }
}
```

**Response Thành Công:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR...",
  "refresh_token": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "email": "user@example.com",
    "fullname": "Nguyễn Văn A",
    "avatar": "https://example.com/avatar.jpg",
    "role": "user"
  }
}
```

### 6.2. Gắn Access Token Vào Các Request Yêu Cầu Xác Thực

Khi gọi các API cần đăng nhập (ví dụ: lấy thông tin cá nhân), FE phải truyền `access_token` vào header `Authorization`.

**Ví dụ gọi API bằng `fetch`:**
```javascript
const getProfile = async () => {
  const accessToken = localStorage.getItem('access_token');
  
  const response = await fetch('https://api.yourdomain.com/users/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  return response.json();
}
```

### 6.3. Tự Động Cấp Lại Token (Refresh Token)

Vì `access_token` có thời gian sống ngắn, khi token hết hạn (server trả về lỗi `401 Unauthorized`), FE cần dùng `refresh_token` để lấy token mới và tự động gọi lại API bị lỗi.

**Ví dụ xử lý tự động bằng Axios Interceptor:**
```javascript
import axios from 'axios';

const api = axios.create({ baseURL: 'https://api.yourdomain.com' });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa từng thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post('/auth/refresh', {
          refreshToken: refreshToken
        });

        // Cập nhật token mới vào LocalStorage
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);

        // Cập nhật header Authorization và gọi lại request gốc
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${res.data.access_token}`;
        return api(originalRequest);
      } catch (err) {
        // Refresh token cũng đã hết hạn -> Bắt buộc user đăng nhập lại
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
```

### 6.4. Đăng Nhập Bằng Google (OAuth2)

Sử dụng thư viện Google Sign-In trên Frontend (như `@react-oauth/google`) để lấy `idToken`, sau đó gửi token này cho Backend.

**Request:**
```javascript
const loginWithGoogle = async (googleIdToken) => {
  const response = await fetch('https://api.yourdomain.com/auth/login?provider=google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: googleIdToken })
  });
  
  const data = await response.json();
  // Xử lý lưu token giống như đăng nhập bằng Email/Password ở trên
}
```

### 6.5. Đăng Xuất (Logout)

Khi đăng xuất, cần gọi API để báo cho server biết để hủy (xóa) `refresh_token` trong Database, sau đó mới xóa dữ liệu ở frontend.

```javascript
const logout = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  
  // Xóa session ở Backend
  if (refreshToken) {
    await fetch('https://api.yourdomain.com/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
  }

  // Xóa toàn bộ thông tin đăng nhập ở Frontend
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  
  // Chuyển hướng về trang đăng nhập
  window.location.href = '/login';
}
```