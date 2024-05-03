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
  deadline?: Date;
};

export type CreateDocumentParams = {
  title: string;
  user_id: string;
  folder_id?: string;
  filepath: string;
  deadline?: Date;
};

export type UpdateDocumentParams = {
  title?: string;
  folder_id?: string;
  status?: string;
  filepath?: string;
};

export type UpdateDocumentByIdParams = {
  id: string;
} & UpdateDocumentParams;
