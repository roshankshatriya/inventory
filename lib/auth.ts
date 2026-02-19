import { cookies } from "next/headers";

export interface SessionUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

// ── Hardcoded credentials (replace with DB lookup when ready) ──
const USERS = [
    {
        id: "1",
        name: "Roshan Raviraj",
        email: "roshan@example.com",
        password: "password123",
        role: "Admin",
    },
];

export const SESSION_COOKIE = "inv_session";

export function verifyCredentials(
    email: string,
    password: string
): SessionUser | null {
    const user = USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return null;
    return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export function encodeSession(user: SessionUser): string {
    return Buffer.from(JSON.stringify(user)).toString("base64");
}

export function decodeSession(value: string): SessionUser | null {
    try {
        return JSON.parse(Buffer.from(value, "base64").toString("utf-8"));
    } catch {
        return null;
    }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
    const store = await cookies();
    const cookie = store.get(SESSION_COOKIE);
    if (!cookie?.value) return null;
    return decodeSession(cookie.value);
}
