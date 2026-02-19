"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { categoryData } from "./data";

export default function CategoryPie() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Category Distribution</h3>
                <p className="text-xs text-gray-500">Products by category</p>
            </div>

            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                    >
                        {categoryData.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [`${value}%`, "Share"]}
                        contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
                    />
                </PieChart>
            </ResponsiveContainer>

            {/* Custom legend */}
            <div className="grid grid-cols-2 gap-1.5 mt-2">
                {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-1.5">
                        <div
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-xs text-gray-600 truncate">{cat.name}</span>
                        <span className="text-xs font-semibold text-gray-800 ml-auto">
                            {cat.value}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
