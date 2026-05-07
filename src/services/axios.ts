import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    _silent?: boolean;
  }
}

import { ResponseCode } from "@/constants";
import { store } from "@/stores";
import { clearCredentials } from "@/stores/auth/auth.slice";
import { cookies } from "@/utils/cookie";

const axiosInstance = Axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 3 * 60 * 1000,
});

const redirectLogin = () => {
  store.dispatch(clearCredentials());
  cookies.set("session_hint", "false");

  if (typeof window !== "undefined" && !window.location.pathname.includes("/auth/login")) {
    window.location.replace("/auth/login");
  }
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === ResponseCode.UNAUTHORIZED) {
      const isSilent = error.config?._silent;
      
      if (!isSilent) {
        redirectLogin();
      } else {
        store.dispatch(clearCredentials());
        cookies.set("session_hint", "false");
      }
    }


    return Promise.reject({
      statusCode: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
  }
);

export const request = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<ReqType = any, ResType = any>(
    url: string,
    params?: ReqType,
    config?: AxiosRequestConfig
  ): Promise<ResType> {
    return axiosInstance.get(url, {
      params,
      ...config,
    });
  },
  post<ReqType, ResType>(
    url: string,
    data?: ReqType,
    config?: AxiosRequestConfig<ReqType>
  ): Promise<ResType> {
    return axiosInstance.post(url, data, config);
  },
  put<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
    return axiosInstance.put(url, data);
  },
  patch<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
    return axiosInstance.patch(url, data);
  },
  delete<ReqType, ResType>(url: string, data?: ReqType): Promise<ResType> {
    return axiosInstance.delete(url, { data });
  },
};
