import userService from '@/services/user/user.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const authId = searchParams.get('authId');

    if (authId) {
      const user = await userService.getUserByAuthId(authId);
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ error: 'No autth ID provided' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
