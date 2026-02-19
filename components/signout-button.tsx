"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton({ className }: { className?: string }) {
    const router = useRouter();

    async function handleSignOut() {
        await fetch("/api/auth/signout", { method: "POST" });
        router.push("/");
        router.refresh();
    }

    return (
        <button
            onClick={handleSignOut}
            className={
                className ??
                "text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
            }
        >
            Sign Out
        </button>
    );
}
