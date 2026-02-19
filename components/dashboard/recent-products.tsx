"use client";

import { recentProducts } from "./data";

export default function RecentProductsTable() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Recent Products</h3>
                <p className="text-xs text-gray-500">Latest additions to your inventory</p>
            </div>
            <table className="w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {["Product", "SKU", "Category", "Price", "Qty", "Status"].map((h) => (
                            <th
                                key={h}
                                className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {recentProducts.map((p) => {
                        const isLow = p.quantity <= p.lowStockAt;
                        return (
                            <tr key={p.sku} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 font-medium text-gray-900 text-xs">{p.name}</td>
                                <td className="px-4 py-3 text-gray-400 text-xs font-mono">{p.sku}</td>
                                <td className="px-4 py-3">
                                    <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2 py-0.5 rounded-full">
                                        {p.category}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-800 text-xs">${p.price.toFixed(2)}</td>
                                <td className="px-4 py-3 text-gray-800 text-xs font-semibold">{p.quantity}</td>
                                <td className="px-4 py-3">
                                    {isLow ? (
                                        <span className="text-xs bg-red-50 text-red-600 font-medium px-2 py-0.5 rounded-full">
                                            Low Stock
                                        </span>
                                    ) : (
                                        <span className="text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full">
                                            In Stock
                                        </span>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
