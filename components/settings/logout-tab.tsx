"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, AlertTriangle } from "lucide-react";

interface LogoutTabProps {
    name: string;
    email: string;
    role: string;
}

export default function LogoutTab({ name, email, role }: LogoutTabProps) {
    const router = useRouter();
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);
        await fetch("/api/auth/signout", { method: "POST" });
        router.push("/signin");
        router.refresh();
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Sign Out</h2>
                    <p className="text-sm text-gray-500">End your current session and return to the login screen.</p>
                </div>
            </div>

            {/* Warning banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 mb-6">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                    <p className="font-medium mb-0.5">Before you sign out</p>
                    <p>Make sure you have saved all your changes. Any unsaved work will be lost.</p>
                </div>
            </div>

            {/* Session info */}
            <div className="border border-gray-100 rounded-lg divide-y divide-gray-100 mb-6 text-sm">
                {[
                    { label: "Signed in as", value: name },
                    { label: "Email", value: email },
                ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between px-4 py-3">
                        <span className="text-gray-500">{label}</span>
                        <span className="font-medium text-gray-800">{value}</span>
                    </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-gray-500">Role</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium text-xs">
                        {role}
                    </span>
                </div>
            </div>

            {/* Action buttons */}
            {!confirm ? (
                <button
                    onClick={() => setConfirm(true)}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            ) : (
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleLogout}
                        disabled={loading}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                    >
                        {loading ? "Signing out…" : "Yes, Sign Out"}
                    </button>
                    <button
                        onClick={() => setConfirm(false)}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
