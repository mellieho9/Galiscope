import { CreateDocumentParams, Document, UpdateDocumentParams } from "@/types/document.types";
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetDocumentById = (
  id: string,
  options?: UseQueryOptions<Document, Error>
) => useQuery({
  queryKey: ["get-document-by-id", id],
  queryFn: async () => {
    const { data } = await axios.get<Document>(`api/document/${id}`);
    return data;
  },
  ...options,
});

export const useGetDocumentsByUserId = (
  userId: string,
  options?: UseQueryOptions<Document[], Error>
) => useQuery({
  queryKey: ["get-documents-by-user-id", userId],
  queryFn: async () => {
    const { data } = await axios.get<Document[]>("api/document", { params: { userId } });
    return data;
  },
  ...options,
});

export const useGetDocumentsByFolderId = (
  folderId: string,
  options?: UseQueryOptions<Document[], Error>
) => useQuery({
  queryKey: ["get-documents-by-folder-id", folderId],
  queryFn: async () => {
    const { data } = await axios.get<Document[]>("api/document", { params: { folderId } });
    return data;
  },
  ...options,
});

export const useCreateDocument = (
  options?: UseMutationOptions<Document, Error, CreateDocumentParams>
) => useMutation({
  mutationKey: ["create-document"],
  mutationFn: async (values: CreateDocumentParams) => {
    const { data } = await axios.post<Document>("api/document", values);
    return data;
  },
  ...options,
});

export const useUpdateDocument = (
  id: string,
  options?: UseMutationOptions<Document, Error, UpdateDocumentParams>
) => useMutation({
  mutationKey: ["update-document"],
  mutationFn: async (values: UpdateDocumentParams) => {
    const { data } = await axios.put<Document>(`api/document/${id}`, values);
    return data;
  },
  ...options,
});

export const useDeleteDocument = (
  id: string,
  options?: UseMutationOptions<void, Error>
) => useMutation({
  mutationKey: ["delete-document"],
  mutationFn: async () => {
    await axios.delete(`api/document/${id}`);
  },
  ...options,
});
