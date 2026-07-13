import { getToken } from "next-auth/jwt";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export async function getMyToken(req?: NextRequest) {
  // Route handlers — req is available
  if (req) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token?.accessToken) throw new Error("Unauthorized no token available");
    return token
  }

  // Server components / server actions — build req from cookies and headers
  const request = {
    headers: Object.fromEntries(headers()),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  } as unknown as NextRequest;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.accessToken) throw new Error("Unauthorized no token available");
  return token
}