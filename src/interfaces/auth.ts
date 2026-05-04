import { Role } from "@/constants";

export interface User {
  _id: string;
  email: string;
  fullname: string;
  phone: string;
  role: Role;
  isVerified: boolean;
  userStatus: string;
  avatar?: string | null;
  birthday?: string | null;
  gender?: string | null;
  provinceId?: string | null;
  districtId?: string | null;
  wardId?: string | null;
  address?: string | null;
  soCccd?: string | null;
  ngayCapCccd?: string | null;
  noiCapCccd?: string | null;
}



export interface AuthData {
  access_token: string;
  refresh_token: string;
  user: User;
}


export interface LoginDto {
  email: string;
  password: string;
}

export interface GoogleLoginDto {
  idToken: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  fullname: string;
  phone: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

