import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = new Set([
    "/login",
    "/register",
    "/forgot-password",
]);

const protectedRoutes = new Set([
    "/",
    "/profile",
]);

export default async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    const isAuthRoute = authRoutes.has(pathname);
    const isProtectedRoute = protectedRoutes.has(pathname);

    if (isProtectedRoute && !isAuthRoute) {
        if (token) return NextResponse.next();

        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("callbackUrl", request.url);

        return NextResponse.redirect(redirectUrl);
    }

    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};