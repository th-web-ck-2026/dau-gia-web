import { ResponseData } from "@/interfaces/common";
import { request } from "@/services/axios";

export const uploadImagePublic = (data: FormData) =>
  request.post<FormData, ResponseData<string>>("/file/image/upload", data);

export const uploadImagePrivate = (data: FormData) =>
  request.post<FormData, ResponseData<string>>(
    "/file/image/upload/private",
    data
  );
