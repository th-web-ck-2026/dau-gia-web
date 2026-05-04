import { AuthProvider } from "@/constants";
import {
  AuthData,
  ChangePasswordDto,
  ForgotPasswordDto,
  GoogleLoginDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
  User,
} from "@/interfaces/auth";
import { ResponseData } from "@/interfaces/common";
import { request } from "@/services/axios";

export const login = (
  data: LoginDto | GoogleLoginDto,
  provider: AuthProvider
) =>
  request.post<LoginDto | GoogleLoginDto, ResponseData<AuthData>>(
    `/auth/login?provider=${provider}`,
    data
  );

export const register = (data: RegisterDto) =>
  request.post<RegisterDto, ResponseData<User>>("/auth/register", data);

export const forgotPassword = (data: ForgotPasswordDto) =>
  request.post<ForgotPasswordDto, ResponseData<any>>(
    "/auth/forgot-password",
    data
  );

export const resetPassword = (data: ResetPasswordDto) =>
  request.post<ResetPasswordDto, ResponseData<any>>(
    "/auth/reset-password/token",
    data
  );

export const changePassword = (data: ChangePasswordDto) =>
  request.post<ChangePasswordDto, ResponseData<any>>(
    "/auth/change-password",
    data
  );

export const logout = () =>
  request.post<undefined, ResponseData<any>>("/auth/logout");

export const logoutAll = () =>
  request.post<undefined, ResponseData<any>>("/auth/logout-all");
