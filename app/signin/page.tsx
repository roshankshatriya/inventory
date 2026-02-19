"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Package2, Eye, EyeOff, AlertTriangle } from "lucide-react";

// ── Inner form — uses useSearchParams, must be inside <Suspense> ──
function SignInForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") ?? "/dashboard";

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Sign in failed.");
            router.push(from);
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8">
            {error && (
                <div className="mb-5 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Email Address
                    </label>
                    <input
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="roshan@example.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            autoComplete="current-password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            placeholder="••••••••"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm mt-2"
                >
                    {loading ? "Signing in…" : "Sign In"}
                </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center mb-3 font-medium uppercase tracking-wide">
                    Demo Credentials
                </p>
                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-1 font-mono">
                    <p>Email: <span className="font-semibold text-gray-800">roshan@example.com</span></p>
                    <p>Password: <span className="font-semibold text-gray-800">password123</span></p>
                </div>
            </div>
        </div>
    );
}

// ── Page shell — no useSearchParams here ──
export default function SignInPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                            <Package2 className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">InventoryPro</span>
                    </Link>
                    <h1 className="text-white text-2xl font-bold mt-6">Welcome back</h1>
                    <p className="text-purple-200 text-sm mt-1">
                        Sign in to manage your inventory
                    </p>
                </div>

                {/* Card — wrapped in Suspense because SignInForm uses useSearchParams */}
                <Suspense
                    fallback={
                        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center text-gray-400 text-sm">
                            Loading…
                        </div>
                    }
                >
                    <SignInForm />
                </Suspense>

                <p className="text-center text-purple-200 text-sm mt-6">
                    <Link href="/" className="hover:text-white transition-colors">
                        ← Back to home
                    </Link>
                </p>
            </div>
        </div>
    );
}
