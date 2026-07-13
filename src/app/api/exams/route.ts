// import { getMyToken } from "@/lib/utility/manage-token";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const token = await getMyToken(req);

//   const { searchParams } = req.nextUrl;
//   const page = searchParams.get("page") ?? "1";
//   const limit = searchParams.get("limit") ?? "6";
//   const diplomaId = searchParams.get("diplomaId") ?? "";
//   const search = searchParams.get("search") ?? "";

//   const params = new URLSearchParams({ page, limit });
//   if (diplomaId) params.append("diplomaId", diplomaId);
//   if (search) params.append("search", search);

//   const res = await fetch(`${process.env.API}/exams?${params}`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token.accessToken}`,
//     },
//   });

//   const data = await res.json();
//   if (!res.ok) return NextResponse.json(data, { status: res.status });

//   return NextResponse.json(data);
// }