import { sendGeminiMessage } from '@/services/gemini/gemini.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { input, history } = await request.json();
  console.log(input, history);

  const geminiResponse = await sendGeminiMessage({ input, history });

  if (!geminiResponse || typeof geminiResponse !== 'string') {
    return NextResponse.json(
      { error: 'Failed to fetch Gemini response' },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { geminiResponse: geminiResponse },
    { status: 201 }
  );
}
