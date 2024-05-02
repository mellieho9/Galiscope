import { CreateDocumentParams, Document } from '../../types/document.types';
import DbService from '../db.service';

const documentService = new DbService<Document>('document');

const getDocumentById = async (id: string) => {
  const response = await documentService
    .select()
    .eq('id', id)
    .single();

  return response?.data;
}

const getDocumentsByUserId = async (userId: string) => {
  const response = await documentService
    .select()
    .eq('user_id', userId);

  return response?.data;
}

const getDocumentsByFolderId = async (folderId: string) => {
  const response = await documentService
    .select()
    .eq('folder_id', folderId);

  return response?.data;
}

const createDocument = async ({
  title,
  user_id,
  folder_id,
  filepath,
  deadline,
}: CreateDocumentParams) => {
  const response =  await documentService.create({
    title,
    user_id,
    folder_id: folder_id,
    filepath,
    is_deleted: false,
    deadline,
  });

  return response?.data?.[0];
};


const updateDocument = async (documentData: any) => {
  const { data } = await documentService.update({ id: documentData.id }, documentData);

  return data && data[0];
}

const deleteDocument = async (id: string) => {
  const { data } = await documentService.delete().filter('id', 'eq', id).select();

  return data && data[0];
}

export default Object.assign(documentService, {
  getDocumentById,
  getDocumentsByUserId,
  getDocumentsByFolderId,
  createDocument,
  updateDocument,
  deleteDocument,
});
