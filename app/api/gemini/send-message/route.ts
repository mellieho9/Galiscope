import chatHistoryService from '@/services/chat-history/chat-history.service';
import { sendGeminiMessage } from '@/services/gemini/gemini.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { input, history } = await request.json();
  console.log(input, history);

  const geminiResponse = await sendGeminiMessage({ input, history });

  if (!geminiResponse) {
    return NextResponse.json(
      { error: 'Failed to fetch Gemini response' },
      { status: 400 }
    );
  }
  await chatHistoryService.updateChatHistory(history);

  return NextResponse.json(
    { geminiResponse: geminiResponse, history: history },
    { status: 201 }
  );
}
