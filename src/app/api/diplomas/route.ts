import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.accessToken) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const page = searchParams.get("page") ?? "1";
  const search = searchParams.get("search") ?? "";

  const params = new URLSearchParams({ page });
  if (search) params.append("search", search);

  const res = await fetch(`${process.env.API}/diplomas?${params}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) return NextResponse.json(data, { status: res.status });

  return NextResponse.json(data.payload ?? data);
}