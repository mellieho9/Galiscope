import chatHistoryService from "@/services/chat-history/chat-history.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = await chatHistoryService.createChatHistory()

    if (!response) {
      return NextResponse.json({ error: 'Can not create chat history' }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}