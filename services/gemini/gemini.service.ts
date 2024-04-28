import { diagram_history, summary_history } from "@/utils/gemini/finetune";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendQuestion } from ".";
import { GeminiMessage } from '@/types/gemini.types';

export const createTextSummary = async (input: string) => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_TEXT_KEY || '');
  const history = summary_history

  return await sendQuestion({ input, genAI, history })
};

export const createUMLCode = async (input: string) => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_UML_KEY || '');
  const history = diagram_history

  return await sendQuestion({ input, genAI, history })
};

export const sendGeminiMessage = async ( {input, history}: GeminiMessage ) => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_UML_KEY || '');

  return await sendQuestion({ input, genAI, history })
}