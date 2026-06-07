import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { ResponseCode } from "@/constants";
import { store } from "@/stores";
import { clearCredentials } from "@/stores/auth/auth.slice";
import { cookies } from "@/utils/cookie";

declare module "axios" {
  export interface AxiosRequestConfig {
    _silent?: boolean;
  }
}

const axiosInstance = Axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 3 * 60 * 1000,
  paramsSerializer: {
    serialize: (params) => {
      if (!params) return "";
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) return;

        if (key === "order" && typeof value === "object") {
          const orderStr = Object.entries(value)
            .filter(([_, val]) => !!val)
            .map(([field, dir]) => `${field}:${dir}`)
            .join(",");
          if (orderStr) {
            searchParams.append(key, orderStr);
          }
        } else if (key === "condition" && typeof value === "object") {
          searchParams.append(key, JSON.stringify(value));
        } else if (Array.isArray(value)) {
          value.forEach((val) => searchParams.append(key, String(val)));
        } else if (typeof value === "object") {
          searchParams.append(key, JSON.stringify(value));
        } else {
          searchParams.append(key, String(value));
        }
      });

      return searchParams.toString();
    },
  },
});

const redirectLogin = () => {
  store.dispatch(clearCredentials());
  cookies.set("session_hint", "false");

  if (
    typeof window !== "undefined" &&
    !window.location.pathname.includes("/auth/login")
  ) {
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
