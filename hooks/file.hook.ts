import { getSignedUrl } from "@/services/storage.service";
import api from "@/utils/axios/axios";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

export const useUploadDocumentFile = (
  options?: UseMutationOptions<{ filepath: string }, Error, { user_id: string; file: File }>
) => useMutation({
  mutationKey: ["upload-document-file"],
  mutationFn: async ({ user_id, file }: { user_id: string; file: File }) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("files", file);

    const { data } = await api.post<{ filepath: string }>("api/file/upload-document", formData);
    return data;
  },
  ...options,
});

export const useUploadImageFile = (
  options?: UseMutationOptions<{ filepath: string }, Error, { document_id: string; file: File }>
) => useMutation({
  mutationKey: ["upload-image-file"],
  mutationFn: async ({ document_id, file }: { document_id: string; file: File }) => {
    const formData = new FormData();
    formData.append("document_id", document_id);
    formData.append("files", file);

    const { data } = await api.post<{ filepath: string }>("api/file/upload-image", formData);
    return data;
  },
  ...options,
});

export const useGetSignedUrl = async (
  filepath: string
) => {
  const bucket = filepath.substring(0, filepath.indexOf('/'));
  const path = filepath.substring(filepath.indexOf('/') + 1);

  const signedUrl = await getSignedUrl({ bucket, path });

  return signedUrl;
}
