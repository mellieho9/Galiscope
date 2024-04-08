import { CreateDocumentParams, Document } from '../../types/document.types';
import DbService from '../db.service';

const documentService = new DbService<Document>('documents');

const getDocumentById = async (id: string) => {
  const response = await documentService
    .select()
    .eq('id', id)
    .single();

  return response?.data?.[0];
}

const getDocumentsByUserId = async (userId: string) => {
  const response = await documentService
    .select()
    .eq('user_id', userId);

  return response?.data?.[0];
}

const getDocumentsByFolderId = async (folderId: string) => {
  const response = await documentService
    .select()
    .eq('folder_id', folderId);

  return response?.data?.[0];
}

const createDocument = async ({
  title,
  description,
  user_id,
  folder_id,
  filepath
}: CreateDocumentParams) => {
  const response =  await documentService.create({
    title,
    description,
    user_id,
    folder_id,
    filepath,
    is_deleted: false
  });

  return response?.data?.[0];
};

const updateDocument = async (documentData: any) => {
  const { data } = await documentService.update({ id: documentData.id }, documentData);

  return data && data[0];
}

export default Object.assign(documentService, {
  getDocumentById,
  getDocumentsByUserId,
  getDocumentsByFolderId,
  createDocument,
  updateDocument,
});
