import { Content } from "@google/generative-ai";

export type ChatHistory = {
  id: string;
  created_at: Date;
  updated_at: Date;
  history: Content[];
};

export type CreateChatHistoryParams = {
  history: Content[];
}

export type UpdateChatHistoryParams = {
  history?: Content[]
}
