import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.accessToken) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const res = await fetch(`${process.env.API}/diplomas/${params.id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) return NextResponse.json(data, { status: res.status });

  const payload = data.payload ?? data;
  return NextResponse.json("diploma" in payload ? payload.diploma : payload);
}