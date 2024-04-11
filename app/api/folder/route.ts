import folderService from '@/services/folder/folder.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId) {
      const response = await folderService.getFoldersByUserId(userId);
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, user_id } = await request.json();
    const response = await folderService.createFolder({ name, user_id });

    if (!response) {
      return NextResponse.json({ error: 'Failed to create folder' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
