import { createUMLCode } from '@/services/gemini/gemini.service';
import { getTextFromImage } from '@/services/tesseract/tesseract.service';
import { GeminiMessage } from '@/types/gemini.types';
import axios from 'axios';

export const generateDiagramHelper = async ({
  input,
  history,
}: GeminiMessage) => {
  const umlCode = await createUMLCode({ input, history });
  const diagram = await axios.post(
    process.env.NEXT_PUBLIC_PLANTUML_SERVER_URL || '',
    { input: umlCode },
    { responseType: 'arraybuffer' }
  );

  const textImg = await getTextFromImage(diagram.data);
  const textImgArr = textImg.split(/\n+/)
  const length = textImgArr.length;

  return { textImgArr, length, diagram };
};
