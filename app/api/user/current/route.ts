import userService from "@/services/user/user.service";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const res = await supabase.auth.getUser();

    if (!res.data.user) {
      return NextResponse.json(null, { status: 401 });
    }

    const authId = res.data.user.id;
    const user = await userService.getUserByAuthId(authId);

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
