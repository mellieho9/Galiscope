export type Folder = {
  id: string;
  name: string;
  user_id: string;
  is_deleted: boolean;
  created_on: Date;
  updated_on: Date;
};

export type CreateFolderParams = {
  name: string;
  user_id: string;
};

export type UpdateFolderParams = {
  name?: string;
}
