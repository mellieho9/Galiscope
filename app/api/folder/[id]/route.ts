import folderService from "@/services/folder/folder.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await folderService.getFolderById(id);

    if (!response) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const response = await folderService.updateFolder({ id, ...body });

    if (!response) {
      return NextResponse.json({ error: 'Failed to update folder' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await folderService.deleteFolder(id);

    if (!response) {
      return NextResponse.json({ error: 'Failed to delete folder' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
