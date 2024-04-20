import { createTextSummary } from "@/services/gemini/gemini.service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { text } = await request.json()
  const response = await createTextSummary(text)

  if (!response) {
    return NextResponse.json({ error: 'Failed to summarize text' }, { status: 400 });
  }

  return NextResponse.json(response, { status: 201 });
}