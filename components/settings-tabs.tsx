"use client";

import { useState } from "react";
import { User, Lock, LogOut } from "lucide-react";

import ProfileTab from "./settings/profile-tab";
import PasswordTab from "./settings/password-tab";
import LogoutTab from "./settings/logout-tab";

type Tab = "profile" | "password" | "logout";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profile", label: "User Info", icon: User },
    { id: "password", label: "Change Password", icon: Lock },
    { id: "logout", label: "Logout", icon: LogOut },
];

const DEFAULT_PROFILE = {
    name: "Roshan Raviraj",
    email: "roshan@example.com",
    phone: "+91 98765 43210",
    role: "Admin",
};

export default function SettingsTabs() {
    const [activeTab, setActiveTab] = useState<Tab>("profile");
    const [profile, setProfile] = useState(DEFAULT_PROFILE);

    return (
        <div className="max-w-3xl">
            {/* Tab navigation */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
                {tabs.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`flex items-center gap-2 flex-1 justify-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === id
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-500 hover:text-gray-700 hover:bg-white/60"
                            }`}
                    >
                        <Icon className="w-4 h-4" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Active tab content */}
            {activeTab === "profile" && (
                <ProfileTab profile={profile} onProfileChange={setProfile} />
            )}
            {activeTab === "password" && <PasswordTab />}
            {activeTab === "logout" && (
                <LogoutTab name={profile.name} email={profile.email} role={profile.role} />
            )}
        </div>
    );
}
