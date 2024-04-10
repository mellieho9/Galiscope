import { CreateUserParams, User } from "@/types/user.types";
import DbService from "../db.service";

const userService = new DbService<User>("users");

const getUserById = async (id: string) => {
  const response = await userService
    .select()
    .eq("id", id)
    .single();

  return response?.data?.[0];
}

const getUserByAuthId = async (auth_id: string) => {
  const response = await userService
    .select()
    .eq("auth_id", auth_id)
    .single();

  return response?.data?.[0];
}

const getUsersByEmail = async (email: string) => {
  const response = await userService
    .select()
    .eq("email", email);

  return response?.data;
}

const createUserService = async ({
  name,
  email,
  auth_id,
}: CreateUserParams) => {
  const response = await userService.create({
    name,
    email,
    auth_id
  });

  return response?.data?.[0];
};

const updateUser = async (userData: any) => {
  const { data } = await userService.update({ id: userData.id }, userData);

  return data && data[0];
}

export default Object.assign(userService, {
  getUserById,
  getUserByAuthId,
  getUsersByEmail,
  createUserService,
  updateUser,
});
