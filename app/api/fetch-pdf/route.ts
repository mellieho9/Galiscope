import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 400 });
    }

    const blob = await response.blob();

    const buffer = await blob.arrayBuffer();

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
