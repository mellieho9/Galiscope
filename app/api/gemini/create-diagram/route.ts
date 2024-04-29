import { NextRequest, NextResponse } from 'next/server';
import { Content } from '@google/generative-ai';
import { diagram_history } from '@/utils/gemini/finetune';
import { generateDiagramHelper } from './helper';

export async function POST(request: NextRequest) {
  const { diagramType, text } = await request.json();

  let input = `Type: ${diagramType}. Text: ${text}`;
  let history: Content[] = diagram_history;
  let generateTime = 0;
  
  let { textImgArr, length, diagram } = await generateDiagramHelper({ input, history})

  while (length >= 2 && textImgArr[length - 2].trim() == 'Syntax Error?' && generateTime < 3) {
    input = `Syntax error at ${textImgArr[length - 3]}`;    
    // console.log(textImgArr, input);
    ({ textImgArr, length, diagram } = await generateDiagramHelper({ input, history }));
    generateTime += 1;
  }

  return new NextResponse(diagram.data, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
