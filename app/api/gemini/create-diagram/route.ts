import { createTextSummary, createUMLCode } from './../../../../services/gemini/gemini.service';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { diagram, text } = await request.json()

  const input = `Type: ${diagram}. Text: ${text}`
  const response = createUMLCode(input)

  if (!response) {
    return NextResponse.json({ error: 'Failed to create diagram' }, { status: 400 });
  }

  return NextResponse.json(response, { status: 201 });
}