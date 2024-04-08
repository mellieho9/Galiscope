import { CreateDocumentParams, Document } from '../../types/document.types';
import DbService from '../db.service';

const service = new DbService<Document>('documents');

const getDocumentById = async (id: string) => {
  const response = await service
    .select()
    .eq('id', id)
    .single();

  return response?.data?.[0];
}

const getDocumentsByUserId = async (userId: string) => {
  const response = await service
    .select()
    .eq('user_id', userId);

  return response?.data?.[0];
}

const createDocument = async ({
  title,
  description,
  user_id,
  folder_id,
  filepath
}: CreateDocumentParams) => {
  const response =  await service.create({
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
  const { data } = await service.update({ id: documentData.id }, documentData);

  return data && data[0];
}

export default Object.assign(service, {
  getDocumentById,
  getDocumentsByUserId,
  createDocument,
  updateDocument,
});
