import userService from "@/services/user/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const response = await userService.getUserById(id);

    if (!response) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const response = await userService.updateUser({ id, ...body });

    if (!response) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
