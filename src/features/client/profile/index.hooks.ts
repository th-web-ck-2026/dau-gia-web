import { useDispatch } from "react-redux";

import { useQueryClient } from "@tanstack/react-query";

import { getMe, updateMe, updateToChucProfile } from "@/api/user";
import { useAppMutation } from "@/hooks/common";
import { ToChucProfile, User } from "@/interfaces/auth";
import { ResponseData } from "@/interfaces/common";
import { setCredentials } from "@/stores/auth/auth.slice";

export interface UpdateOrganizationPayload {
  userPayload: Partial<User>;
  orgPayload: Partial<ToChucProfile> & { licenseImage?: string };
}

export const useSyncUserCredentials = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return async () => {
    try {
      const response = await getMe();
      if (response?.data) {
        dispatch(setCredentials(response.data));
        queryClient.invalidateQueries({ queryKey: ["getMe"] });
      }
    } catch (error) {
      console.error("Failed to sync user credentials after update:", error);
    }
  };
};

export const useUpdateIndividual = (options?: { onSuccess?: () => void }) => {
  return useAppMutation<ResponseData<User>, Error, Partial<User>>(
    updateMe,
    options
  );
};

export const useUpdateOrganization = (options?: { onSuccess?: () => void }) => {
  return useAppMutation<
    ResponseData<ToChucProfile>,
    Error,
    UpdateOrganizationPayload
  >(async (payload) => {
    await updateMe(payload.userPayload);
    return updateToChucProfile(payload.orgPayload);
  }, options);
};

export const useUpdateMe = (options?: { onSuccess?: () => void }) => {
  return useAppMutation<ResponseData<User>, Error, Partial<User>>(
    updateMe,
    options
  );
};
