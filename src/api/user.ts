import { User } from "@/interfaces/auth";
import { ResponseData } from "@/interfaces/common";
import { request } from "@/services/axios";

export const getMe = () =>
  request.get<undefined, ResponseData<User>>("/user/me", undefined, {
    _silent: true,
  });
