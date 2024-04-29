import chatHistoryService from "@/services/chat-history/chat-history.service";
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await chatHistoryService.getChatHistoryById(id)

    if (!response) {
      return NextResponse.json({ error: 'Chat history not found' }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const response = await chatHistoryService.updateChatHistory({ id, ...body });

    if (!response) {
      return NextResponse.json({ error: 'Failed to update chat history' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await chatHistoryService.deleteChatHistory(id);

    if (!response) {
      return NextResponse.json({ error: 'Failed to delete chat history' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
