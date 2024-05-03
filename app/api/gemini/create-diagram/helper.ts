import { createUMLCode } from '@/services/gemini/gemini.service';
import { getTextFromImage } from '@/services/tesseract/tesseract.service';
import { GeminiMessage } from '@/types/gemini.types';
import axios from 'axios';

export const generateDiagramHelper = async ({
  input,
  history,
}: GeminiMessage) => {
  const response = await createUMLCode({ input, history });

  if (!response) {
    return { textImg: '', updatedHistory: history, diagram: null };
  }

  const { umlCode, history: updatedHistory } = response;

  const diagram = await axios.post(
    process.env.NEXT_PUBLIC_PLANTUML_SERVER_URL || '',
    { input: umlCode },
    { responseType: 'arraybuffer' }
  );

  const textImg = await getTextFromImage(diagram.data);

  return { textImg, updatedHistory, umlCode, diagram };
};
