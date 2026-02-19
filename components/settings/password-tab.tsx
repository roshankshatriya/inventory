"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function PasswordTab() {
    const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
    const [show, setShow] = useState({ current: false, newPass: false, confirm: false });
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (form.newPass.length < 8) {
            setError("New password must be at least 8 characters.");
            return;
        }
        if (form.newPass !== form.confirm) {
            setError("Passwords do not match.");
            return;
        }
        setSaved(true);
        setForm({ current: "", newPass: "", confirm: "" });
        setTimeout(() => setSaved(false), 3000);
    }

    const strengthLevel = Math.min(4, Math.floor(form.newPass.length / 3));
    const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-900">Change Password</h2>
                    <p className="text-sm text-gray-500">Use a strong password of at least 8 characters.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Current password */}
                {(["current", "newPass", "confirm"] as const).map((field) => {
                    const labels: Record<typeof field, string> = {
                        current: "Current Password",
                        newPass: "New Password",
                        confirm: "Confirm New Password",
                    };
                    const placeholders: Record<typeof field, string> = {
                        current: "Enter current password",
                        newPass: "At least 8 characters",
                        confirm: "Repeat new password",
                    };
                    return (
                        <div key={field}>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                                {labels[field]}
                            </label>
                            <div className="relative">
                                <input
                                    type={show[field] ? "text" : "password"}
                                    value={form[field]}
                                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                    required
                                    placeholder={placeholders[field]}
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow({ ...show, [field]: !show[field] })}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {show[field] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {/* Strength bar under newPass */}
                            {field === "newPass" && form.newPass && (
                                <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-1 flex-1 rounded-full transition-colors ${i <= strengthLevel ? strengthColors[strengthLevel - 1] : "bg-gray-200"
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {error && (
                    <p className="flex items-center gap-1.5 text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        {error}
                    </p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {saved ? (
                        <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                            <CheckCircle2 className="w-4 h-4" /> Password updated!
                        </span>
                    ) : (
                        <span />
                    )}
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                    >
                        <Lock className="w-4 h-4" />
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
}
