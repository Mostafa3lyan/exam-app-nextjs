import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// The ONLY routes accessible without authentication.
// Everything else requires a valid session by default.
const publicRoutes = new Set([
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
]);

// Routes only accessible when logged OUT — redirect away if authenticated.
// (Subset of publicRoutes; not every public route needs this, e.g. a
// public marketing page wouldn't redirect a logged-in user away.)
const authOnlyRoutes = publicRoutes;

function isSafeRelativeUrl(url: string): boolean {
    return url.startsWith("/") && !url.startsWith("//") && !url.startsWith("/\\");
}

export default async function middleware(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });
    const isAuthenticated = !!token;

    const isPublic = publicRoutes.has(pathname);

    // Logged-in users shouldn't see login/register/etc.
    if (authOnlyRoutes.has(pathname) && isAuthenticated) {
        const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
        const destination =
            callbackUrl && isSafeRelativeUrl(callbackUrl) ? callbackUrl : "/";
        return NextResponse.redirect(new URL(destination, request.url));
    }

    // Everything NOT explicitly public requires auth — fail closed.
    if (!isPublic && !isAuthenticated) {
        const redirectUrl = new URL("/login", request.url);
        redirectUrl.searchParams.set("callbackUrl", pathname + search);
        return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$).*)",
    ],
};