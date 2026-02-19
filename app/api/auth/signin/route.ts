import { NextRequest, NextResponse } from "next/server";
import {
    verifyCredentials,
    encodeSession,
    SESSION_COOKIE,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const user = verifyCredentials(email, password);

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 401 }
            );
        }

        const res = NextResponse.json({ success: true, user });
        res.cookies.set(SESSION_COOKIE, encodeSession(user), {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            sameSite: "lax",
        });
        return res;
    } catch {
        return NextResponse.json({ error: "Server error." }, { status: 500 });
    }
}
