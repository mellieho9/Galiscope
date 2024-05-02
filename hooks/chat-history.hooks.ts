import { ChatHistory, CreateChatHistoryParams } from "@/types/chat-history.types";
import api from "@/utils/axios/axios";
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";

export const useGetChatHistoryById = (
  id: string,
  options?: UseQueryOptions<ChatHistory, Error>
) => useQuery({
  queryKey: ["get-chat-history-by-id", id],
  queryFn: async () => {
    const { data } = await api.get<ChatHistory>(`api/chat-history/${id}`);
    return data;
  },
  ...options,
});

export const useCreateChatHistory = (
  options?: UseMutationOptions<ChatHistory, Error, CreateChatHistoryParams>
) => useMutation({
  mutationKey: ["create-chat-history"],
  mutationFn: async (values: CreateChatHistoryParams) => {
    const { data } = await api.post<ChatHistory>("api/chat-history", values);
    return data;
  },
  ...options,
});

export const useUpdateChatHistory = (
  id: string,
  options?: UseMutationOptions<ChatHistory, Error, CreateChatHistoryParams>
) => useMutation({
  mutationKey: ["update-chat-history"],
  mutationFn: async (values: CreateChatHistoryParams) => {
    const { data } = await api.put<ChatHistory>(`api/chat-history/${id}`, values);
    return data;
  },
  ...options,
});

export const useDeleteChatHistory = (
  options?: UseMutationOptions<ChatHistory, Error, string>
) => useMutation({
  mutationKey: ["delete-chat-history"],
  mutationFn: async (id: string) => {
    const { data } = await api.delete<ChatHistory>(`api/chat-history/${id}`);
    return data;
  },
  ...options,
});
