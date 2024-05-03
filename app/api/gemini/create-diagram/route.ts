import { NextRequest, NextResponse } from 'next/server';
import { Content } from '@google/generative-ai';
import { diagram_history } from '@/utils/gemini/finetune';
import { generateDiagramHelper } from './helper';

export async function POST(request: NextRequest) {
  const { diagramType, text } = await request.json();

  let input = `Type: ${diagramType}. Text: ${text}`;
  let history: Content[] = diagram_history;
  let generateTime = 0;

  console.log("==========Generating diagram=========");
  let { textImg, updatedHistory, umlCode, diagram } = await generateDiagramHelper({ input, history})
  console.log("==========Diagram generated=========\n", textImg, umlCode);

  while (textImg.includes('Syntax Error?') && generateTime < 3) {
    input = `The previous diagram was not generated successfully. Here is the error message: ${textImg}.\n
    Please try again by checking the UML code at the line that it fails, revising the syntax rule for the
    particular diagram type, and regenerate new UML code. Return only the fixed UML code.`;
    console.log('========Syntax Error==========', textImg);
    ({ textImg, updatedHistory, umlCode, diagram } = await generateDiagramHelper({ input, history: updatedHistory }));
    generateTime += 1;
  }

  if (diagram === null) {
    return NextResponse.json({ error: 'Failed to generate diagram.' }, { status: 400 });
  }

  const imageBase64 = `data:image/png;base64,${Buffer.from(diagram.data).toString('base64')}`;

  return new NextResponse(JSON.stringify({ image: imageBase64, umlCode }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
