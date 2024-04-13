import { Folder } from "./folder.types";

export type Document = {
  id: string;
  title: string;
  status: string;
  user_id: string;
  folder_id?: string;
  filepath: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
};

export type DocumentWithFolder = Document & {
  folder: Folder;
};

export type CreateDocumentParams = {
  title: string;
  user_id: string;
  folder_id?: string;
  filepath: string;
};

export type UpdateDocumentParams = {
  title?: string;
  folder_id?: string;
  filepath?: string;
}
