import { diagram_history, summary_history } from "@/utils/gemini/finetune";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { sendQuestion } from ".";

export const createTextSummary = async (input: string) => {
  const genAI = new GoogleGenerativeAI('AIzaSyCrF1FFNNRI9QcO5Vsu8HlDj8RbqUbNPqw');
  const history = summary_history

  return await sendQuestion({ input, genAI, history })
};

export const createUMLCode = async (input: string) => {
  const genAI = new GoogleGenerativeAI('AIzaSyAl-O-iXCRlP9WXm9f4YtagTMlX22lfV-E');
  const history = diagram_history

  return await sendQuestion({ input, genAI, history })
};