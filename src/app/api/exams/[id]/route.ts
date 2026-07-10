import { getMyToken } from "@/lib/utility/manage-token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
    const token = await getMyToken(req);

  const res = await fetch(`${process.env.API}/exams/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const data = await res.json();
  if (!res.ok) return NextResponse.json(data, { status: res.status });

  return NextResponse.json(data);
}