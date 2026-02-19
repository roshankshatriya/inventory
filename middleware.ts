import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "inv_session";

const PROTECTED = ["/dashboard", "/inventory", "/add-product", "/settings"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isProtected = PROTECTED.some((p) => pathname.startsWith(p));

    if (isProtected) {
        const session = request.cookies.get(SESSION_COOKIE);
        if (!session?.value) {
            const loginUrl = new URL("/signin", request.url);
            loginUrl.searchParams.set("from", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Redirect signed-in users away from /signin
    if (pathname === "/signin") {
        const session = request.cookies.get(SESSION_COOKIE);
        if (session?.value) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/inventory/:path*",
        "/add-product/:path*",
        "/settings/:path*",
        "/signin",
    ],
};
