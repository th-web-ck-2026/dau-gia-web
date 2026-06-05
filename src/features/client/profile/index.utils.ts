import { useTranslations } from "next-intl";

import type { BreadcrumbProps, UploadProps } from "antd";
import { message } from "antd";

import { useUpload } from "@/hooks/common";

import {
  useSyncUserCredentials,
  useUpdateIndividual,
  useUpdateMe,
  useUpdateOrganization,
} from "./index.hooks";

const useClientProfile = () => {
  const t = useTranslations("client.profile");
  const syncUserCredentials = useSyncUserCredentials();

  const items: BreadcrumbProps["items"] = [
    {
      title: t("infomationAccount"),
    },
  ];

  const updateIndividualMutation = useUpdateIndividual({
    onSuccess: async () => {
      message.success(t("successSaveInfo"));
      await syncUserCredentials();
    },
  });

  const updateOrganizationMutation = useUpdateOrganization({
    onSuccess: async () => {
      message.success(t("successUpdateOrganization"));
      await syncUserCredentials();
    },
  });

  const updateMeMutation = useUpdateMe({
    onSuccess: async () => {
      await syncUserCredentials();
    },
  });

  const { uploadPublic } = useUpload();

  const handleAvatarUpload = async (
    options: Parameters<Required<UploadProps>["customRequest"]>[0]
  ) => {
    const { file, onSuccess, onError } = options;
    try {
      const response = await uploadPublic.mutateAsync({ file: file as File });
      const avatarUrl = response.data;
      await updateMeMutation.mutateAsync({ avatar: avatarUrl });
      onSuccess?.(avatarUrl);
      message.success(t("successUpdateAvatar"));
    } catch (err) {
      console.error(err);
      onError?.(err as Error);
      message.error(t("errorUpdateAvatar"));
    }
  };

  const isUploadingAvatar =
    uploadPublic.isPending || updateMeMutation.isPending;

  return {
    items,
    t,
    updateIndividual: updateIndividualMutation.mutate,
    isUpdatingIndividual: updateIndividualMutation.isPending,
    updateOrganization: updateOrganizationMutation.mutate,
    isUpdatingOrganization: updateOrganizationMutation.isPending,
    handleAvatarUpload,
    isUploadingAvatar,
  };
};

export default useClientProfile;
export type UseClientProfileResult = ReturnType<typeof useClientProfile>;
