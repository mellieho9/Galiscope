export type Document = {
  id: string;
  title: string;
  status: string;
  user_id: string;
  folder_id?: string;
  filepath: string;
  is_deleted: boolean;
  created_on: Date;
  updated_on: Date;
};

export type CreateDocumentParams = {
  title: string;
  user_id: string;
  folder_id?: string;
  filepath: string;
};
