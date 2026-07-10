import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getMyToken(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.accessToken) {
    throw new Error("Unauthorized");
  }

  return token;
}