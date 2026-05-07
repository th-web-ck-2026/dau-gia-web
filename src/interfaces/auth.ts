import { Role, UserRoleType } from "@/constants";

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
  userRoles?: UserRoleType
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
  code: string;
}

export interface BaseRegisterDto {
  email: string;
  password: string;
  fullname: string;
  phone: string;
  userRoles: UserRoleType;
}

export interface IndividualRegisterDto extends BaseRegisterDto {
  soCccd: string;
}

export interface OrganizationRegisterDto extends BaseRegisterDto {
  // Add organization specific fields here later (e.g. taxCode)
  soCccd: string;
}

export type RegisterDto = IndividualRegisterDto | OrganizationRegisterDto;

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

