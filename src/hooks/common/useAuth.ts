import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMe } from "@/api/user";
import { useAppQuery } from "@/hooks/common/useAppQuery";
import {
  clearCredentials,
  selectUserInfo,
  setCredentials,
} from "@/stores/auth/auth.slice";

import { logout as logoutApi } from "@/api/auth";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const query = useAppQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    enabled: !user,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.data && !user) {
      dispatch(setCredentials(query.data.data));
    }
  }, [query.isSuccess, query.data, user, dispatch]);


  useEffect(() => {
    if (query.isError) {
      dispatch(clearCredentials());
    }
  }, [query.isError, dispatch]);

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      dispatch(clearCredentials());
      window.location.href = "/login";
    }
  };

  return {
    user,
    isLoading: query.isLoading,
    isInitializing: query.isLoading && !user,
    logout,
    refreshUser: query.refetch,
    isAuthenticated: !!user,
  };
};


