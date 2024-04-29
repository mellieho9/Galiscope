import { Content, GoogleGenerativeAI } from "@google/generative-ai";

export type CreateGeminiPrompt = {
  input: string;
  genAI: GoogleGenerativeAI;
  history: Content[];
}

export type GeminiMessage = {
  input: string,
  history: Content[]
}

export type GeminiHistory = {
  currentHistory: Content[],
  history: Content[]
}