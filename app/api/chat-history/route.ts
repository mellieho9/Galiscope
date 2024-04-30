import chatHistoryService from "@/services/chat-history/chat-history.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { history } = await request.json();
    const response = await chatHistoryService.createChatHistory({ history })

    if (!response) {
      return NextResponse.json({ error: 'Failed to create chat history' }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
