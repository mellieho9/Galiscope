import { createTextSummary, createUMLCode } from './../../../../services/gemini/gemini.service';
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

export async function POST(request: NextRequest) {
  const { diagramType, text } = await request.json()

  const input = `Type: ${diagramType}. Text: ${text}`

  // console.log(input)
  const umlCode = await createUMLCode(input)
  // console.log('umlCode:' + umlCode)

  if (!umlCode) {
    return NextResponse.json({ error: 'Failed to create diagram' }, { status: 400 });
  }

  const diagram = await axios.post(process.env.NEXT_PUBLIC_PLANTUML_SERVER_URL || '', { input: umlCode }, { responseType: 'arraybuffer' })

  return new NextResponse(diagram.data, {
    headers: {
      'Content-Type': 'image/png'
    }
  });
}