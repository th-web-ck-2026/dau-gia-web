import { uploadImagePrivate, uploadImagePublic } from "@/api/upload";
import { FileData } from "@/interfaces/common";

import { useAppMutation } from "./useAppMutation";

export const useUpload = () => {
  const uploadPublic = useAppMutation((data: FileData) => {
    const formData = new FormData();
    formData.append("file", data.file);
    return uploadImagePublic(formData);
  });

  const uploadPrivate = useAppMutation((data: FileData) => {
    const formData = new FormData();
    formData.append("file", data.file);
    return uploadImagePrivate(formData);
  });

  return {
    uploadPublic,
    uploadPrivate,
  };
};
