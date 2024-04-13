import { CreateFolderParams, Folder, UpdateFolderParams } from "@/types/folder.types";
import { UseMutationOptions, useMutation, UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useGetFolderById = (
  id: string,
  options?: UseQueryOptions<Folder, Error>
) => useQuery({
  queryKey: ["get-folder-by-id", id],
  queryFn: async () => {
    const { data } = await axios.get<Folder>(`api/folder/${id}`);
    return data;
  },
  ...options,
})

export const useGetFoldersByUserId = (
  userId: string,
  options?: UseQueryOptions<Folder[], Error>
) => useQuery({
  queryKey: ["get-folders-by-user-id", userId],
  queryFn: async () => {
    const { data } = await axios.get<Folder[]>("api/folder", { params: { userId } });
    return data;
  },
  ...options,
})

export const useCreateFolder = (
  options?: UseMutationOptions<Folder, Error, CreateFolderParams>
) => useMutation({
  mutationKey: ["create-folder"],
  mutationFn: async (values: CreateFolderParams) => {
    const { data } = await axios.post<Folder>("api/folder", values);
    return data;
  },
  ...options,
})

export const useUpdateFolder = (
  id: string,
  options?: UseMutationOptions<Folder, Error, UpdateFolderParams>
) => useMutation({
  mutationKey: ["update-folder"],
  mutationFn: async (values: UpdateFolderParams) => {
    const { data } = await axios.put<Folder>(`api/folder/${id}`, values);
    return data;
  },
  ...options,
})

export const useDeleteFolder = (
  options?: UseMutationOptions<Folder, Error, string>
) => useMutation({
  mutationKey: ["delete-folder"],
  mutationFn: async (id: string) => {
    const { data } = await axios.delete<Folder>(`api/folder/${id}`);
    return data;
  },
  ...options,
})
