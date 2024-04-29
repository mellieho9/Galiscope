import { ChatHistory } from '@/types/chat-history.types';
import DbService from '../db.service';
import { diagram_history } from '@/utils/gemini/finetune';

const chatHistoryService = new DbService<ChatHistory>('chat_history');

export const createChatHistory = async () => {
  const response = await chatHistoryService.create({
    history: diagram_history,
  });

  return response?.data?.[0]?.id;
};

export const getChatHistoryById = async (id: string) => {
  const response = await chatHistoryService.select().eq('id', id).single();

  return response?.data;
};

export const updateChatHistory = async (chatHistoryData: any) => {
  const { data } = await chatHistoryService.update({ id: chatHistoryData.id }, chatHistoryData);

  return data && data[0];
};

export const deleteChatHistory = async (id: string) => {
  const { data } = await chatHistoryService.delete().filter("id", "eq", id).select();

  return data && data[0];
}

export default Object.assign(chatHistoryService, {
  createChatHistory,
  getChatHistoryById,
  updateChatHistory,
  deleteChatHistory
});