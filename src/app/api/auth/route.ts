import { getUserByToken } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ userId: null }, { status: 401 });
  }

  try {
    const user = await getUserByToken(token);

    return NextResponse.json({ userId: user?.userId || null });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        userId: null,
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
}
