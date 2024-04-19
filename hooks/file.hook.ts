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
