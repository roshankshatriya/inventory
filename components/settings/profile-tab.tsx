"use client";

import { useState } from "react";
import { Camera, Save, CheckCircle2 } from "lucide-react";

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    role: string;
}

interface ProfileTabProps {
    profile: ProfileData;
    onProfileChange: (profile: ProfileData) => void;
}

export default function ProfileTab({ profile, onProfileChange }: ProfileTabProps) {
    const [saved, setSaved] = useState(false);
    const [form, setForm] = useState(profile);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onProfileChange(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }

    const initials = form.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Avatar gradient header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 flex items-center gap-5">
                <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white/30 select-none">
                        {initials}
                    </div>
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                        <Camera className="w-3.5 h-3.5 text-gray-700" />
                    </button>
                </div>
                <div className="text-white">
                    <h2 className="text-xl font-semibold">{form.name}</h2>
                    <p className="text-purple-200 text-sm">{form.role}</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                            Role
                        </label>
                        <input
                            type="text"
                            value={form.role}
                            readOnly
                            className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 cursor-not-allowed"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    {saved ? (
                        <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                            <CheckCircle2 className="w-4 h-4" /> Changes saved!
                        </span>
                    ) : (
                        <span />
                    )}
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
