import { recommendDiagrams } from "@/services/gemini/gemini.service";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  const response = await recommendDiagrams(text);

  if (!response) {
    return NextResponse.json({ error: 'Failed to recommend diagrams' }, { status: 400 });
  }

  const recommended = response as string[];

  return NextResponse.json(recommended, { status: 201 });
}
