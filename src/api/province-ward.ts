import { ResponseData } from "@/interfaces/common";
import { AdministrativeUnit } from "@/interfaces/province-ward";
import { request } from "@/services/axios";

export const getProvinces = () =>
  request.get<undefined, ResponseData<AdministrativeUnit[]>>(
    "/don-vi-hanh-chinh/tinh-thanh"
  );

export const getWards = (provinceCode: string) =>
  request.get<undefined, ResponseData<AdministrativeUnit[]>>(
    `/don-vi-hanh-chinh/tinh-thanh/${provinceCode}/phuong-xa`
  );
