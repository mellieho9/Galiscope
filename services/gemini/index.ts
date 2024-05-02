import { CreateGeminiPrompt } from '@/types/gemini.types';
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

  const result = await chat.sendMessageStream(input);
  let response = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    response += chunkText;
  }

  return response;
};
