import documentService from "@/services/document/document.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await documentService.getDocumentById(id);

    if (!response) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const response = await documentService.updateDocument({ id, ...body });

    if (!response) {
      return NextResponse.json({ error: 'Failed to update document' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await documentService.deleteDocument(id);

    if (!response) {
      return NextResponse.json({ error: 'Failed to delete document' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
