import { Folder } from "@/types/folder.types";
import DbService from "../db.service";
import { CreateFolderParams } from '../../types/folder.types';
import { data } from "autoprefixer";

const folderService = new DbService<Folder>("folder");

const getFolderById = async (id: string) => {
  const response = await folderService
    .select()
    .eq("id", id)
    .single();

  return response?.data;
}

const getFoldersByUserId = async (userId: string) => {
  const response = await folderService
    .select()
    .eq("user_id", userId);

  return response?.data;
}

const createFolder = async ({
  name,
  user_id,
}: CreateFolderParams) => {
  const response = await folderService.create({
    name,
    user_id
  });

  return response?.data?.[0];
};

const updateFolder = async (folderData: any) => {
  const { data } = await folderService.update({ id: folderData.id }, folderData);
  return data && data[0];
}

const deleteFolder = async (id: string) => {
  const { data } = await folderService.delete().filter("id", "eq", id).select();
  return data && data[0];
}

export default Object.assign(folderService, {
  getFolderById,
  getFoldersByUserId,
  createFolder,
  updateFolder,
  deleteFolder,
});
