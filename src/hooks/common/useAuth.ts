import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResponseCode } from "@/constants";

import { getMe } from "@/api/user";
import { useAppQuery } from "@/hooks/common/useAppQuery";
import {
  clearCredentials,
  selectUserInfo,
  setCredentials,
} from "@/stores/auth/auth.slice";

import { logout as logoutApi } from "@/api/auth";
import { cookies } from "@/utils/cookie";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const sessionHint = cookies.get("session_hint");

  const {
    data,
    error,
    isSuccess,
    isError,
    isFetched,
    isLoading,
    refetch: refreshUser,
  } = useAppQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    enabled: !user && sessionHint !== "false",
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess) {
      if (data?.data) {
        dispatch(setCredentials(data.data));
        cookies.set("session_hint", "true");
      } else {
        dispatch(clearCredentials());
        cookies.set("session_hint", "false");
      }
    } else if (isError) {
      const errorData = (error as any);
      if (errorData?.statusCode === ResponseCode.UNAUTHORIZED) {
        dispatch(clearCredentials());
        cookies.set("session_hint", "false");
      }
    }
  }, [isSuccess, isError, data, error, dispatch]);

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      dispatch(clearCredentials());
      cookies.set("session_hint", "false");
      window.location.href = "/login";
    }
  };

  return {
    user,
    isLoading,
    isInitializing: isLoading && !isFetched && !user,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };
};


