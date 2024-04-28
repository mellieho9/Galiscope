import { CreateGeminiPrompt } from '@/types/gemini-prompt.types';
import {
  MODEL_NAME,
  generationConfig,
  safetySettings,
} from '@/utils/gemini/finetune';

export const sendQuestion = async ({
  input,
  genAI,
  history,
}: CreateGeminiPrompt) => {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: history,
  });

  const result = await chat.sendMessage(input);
  const response = result?.response?.text();

  return response;
};
