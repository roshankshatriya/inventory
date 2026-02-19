"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface StatCardProps {
    label: string;
    value: string;
    sub?: string;
    up?: boolean;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
}

export default function StatCard({
    label,
    value,
    sub,
    up,
    icon: Icon,
    iconBg,
    iconColor,
}: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
                {sub && (
                    <div className="flex items-center gap-1 mt-0.5">
                        {up !== undefined &&
                            (up ? (
                                <ArrowUpRight className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                                <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                            ))}
                        <span
                            className={`text-xs font-medium ${up === true
                                    ? "text-green-600"
                                    : up === false
                                        ? "text-red-500"
                                        : "text-gray-500"
                                }`}
                        >
                            {sub}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
