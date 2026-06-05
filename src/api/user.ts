import { ToChucProfile, User } from "@/interfaces/auth";
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
