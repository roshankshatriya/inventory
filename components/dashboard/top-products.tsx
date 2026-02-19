"use client";

import { topProducts } from "./data";

const BAR_COLORS = ["#7c3aed", "#6366f1", "#0ea5e9", "#10b981", "#f59e0b"];

export default function TopProducts() {
    const maxVal = topProducts[0].value;

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Top Products by Value</h3>
                <p className="text-xs text-gray-500">Highest total stock value</p>
            </div>
            <div className="space-y-3">
                {topProducts.map((p, i) => {
                    const pct = Math.round((p.value / maxVal) * 100);
                    return (
                        <div key={p.sku}>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-xs font-bold text-gray-400 w-4">#{i + 1}</span>
                                    <span className="text-xs font-medium text-gray-800 truncate">{p.name}</span>
                                </div>
                                <span className="text-xs font-semibold text-gray-900 ml-2 whitespace-nowrap">
                                    ${p.value.toLocaleString()}
                                </span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                                <div
                                    className="h-1.5 rounded-full transition-all duration-500"
                                    style={{ width: `${pct}%`, backgroundColor: BAR_COLORS[i] }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
