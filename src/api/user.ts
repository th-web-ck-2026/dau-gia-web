import {
  ToChucProfile,
  User,
  XacMinhUserData,
  XacMinhUserPayload,
} from "@/interfaces/auth";
import { ResponseData } from "@/interfaces/common";
import { request } from "@/services/axios";

export const getMe = () =>
  request.get<undefined, ResponseData<User>>("/user/me", undefined, {
    _silent: true,
  });

export const updateMe = (data: Partial<User>) =>
  request.put<Partial<User>, ResponseData<User>>("/user/me", data);

export const updateToChucProfile = (data: Partial<ToChucProfile>) =>
  request.put<Partial<ToChucProfile>, ResponseData<ToChucProfile>>(
    "/to-chuc-profile/me",
    data
  );

export const getXacMinhUserMe = () =>
  request.get<undefined, ResponseData<XacMinhUserData | null>>(
    "/xac-minh-user/me"
  );

export const createXacMinhUserMe = (data: XacMinhUserPayload) =>
  request.post<XacMinhUserPayload, ResponseData<XacMinhUserData>>(
    "/xac-minh-user/me",
    data
  );
