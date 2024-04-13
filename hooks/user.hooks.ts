import { User } from "@/types/user.types";
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UpdateUserParams } from '../types/user.types';

export const getUserById = (
  id: string,
  options?: UseQueryOptions<User, Error>
) => useQuery({
  queryKey: ["get-user-by-id", id],
  queryFn: async () => {
    const { data } = await axios.get<User>(`api/user/${id}`);
    return data;
  },
  ...options,
})

export const getUserByAuthId = (
  authId: string,
  options?: UseQueryOptions<User, Error>
) => useQuery({
  queryKey: ["get-user-by-auth-id", authId],
  queryFn: async () => {
    const { data } = await axios.get<User>("api/user", { params: { authId } });
    return data;
  },
  ...options,
})

export const updateUser = (
  id: string,
  options?: UseMutationOptions<User, Error, UpdateUserParams>
) => useMutation({
  mutationKey: ["update-user"],
  mutationFn: async (values: UpdateUserParams) => {
    const { data } = await axios.put<User>(`api/user/${id}`, values);
    return data;
  },
  ...options,
})
