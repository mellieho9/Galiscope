export type Folder = {
  id: string;
  name: string;
  user_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
};

export type CreateFolderParams = {
  name: string;
  user_id: string;
};

export type UpdateFolderParams = {
  name?: string;
}
