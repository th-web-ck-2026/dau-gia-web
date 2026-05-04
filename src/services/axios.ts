import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { ResponseCode } from "@/constants";
import { store } from "@/stores";
import { clearCredentials } from "@/stores/auth/auth.slice";

const axiosInstance = Axios.create({
  baseURL: "/api",
  withCredentials: true,
  timeout: 3 * 60 * 1000,
});

const redirectLogin = () => {
  store.dispatch(clearCredentials());

  window.location.replace("/auth/login");
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    if (error.response?.status === ResponseCode.UNAUTHORIZED) {
      redirectLogin();
      return;
    }

    return Promise.reject({
      statusCode: error.response?.status,
      data: error.response?.data,
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
