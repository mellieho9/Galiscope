import documentService from "@/services/document/document.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const folderId = searchParams.get("folderId");

    if (userId && folderId) {
      const response = await documentService.getDocumentsByFolderId(folderId);
      return NextResponse.json(response, { status: 200 });
    } else if (userId) {
      const response = await documentService.getDocumentsByUserId(userId);
      return NextResponse.json(response, { status: 200 });
    } else if (folderId) {
      const response = await documentService.getDocumentsByFolderId(folderId);
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json({ error: "No user ID or folder ID provided" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, user_id, folder_id, filepath } = await request.json();
    const response = await documentService.createDocument({ title, user_id, folder_id, filepath });

    if (!response) {
      return NextResponse.json({ error: "Failed to create document" }, { status: 400 });
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
