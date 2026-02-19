"use client";

import { lowStockAlerts } from "./data";

export default function LowStockAlerts() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-gray-900">Low Stock Alerts</h3>
                    <p className="text-xs text-gray-500">Items needing immediate restock</p>
                </div>
                {lowStockAlerts.length > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {lowStockAlerts.length}
                    </span>
                )}
            </div>

            <div className="divide-y divide-gray-50">
                {lowStockAlerts.length === 0 ? (
                    <div className="px-5 py-8 text-center text-sm text-gray-400">
                        🎉 All products are well-stocked!
                    </div>
                ) : (
                    lowStockAlerts.map((p) => {
                        const pct = Math.round((p.quantity / p.lowStockAt) * 100);
                        return (
                            <div key={p.sku} className="px-5 py-3.5 hover:bg-red-50/40 transition-colors">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-900">{p.name}</p>
                                        <p className="text-xs text-gray-400 font-mono">{p.sku}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-bold text-red-600">{p.quantity}</p>
                                        <p className="text-xs text-gray-400">/ {p.lowStockAt} min</p>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div
                                        className="h-1.5 rounded-full bg-red-400 transition-all"
                                        style={{ width: `${Math.min(pct, 100)}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
                <a
                    href="/inventory"
                    className="text-xs font-medium text-purple-600 hover:text-purple-700"
                >
                    View all inventory →
                </a>
            </div>
        </div>
    );
}
