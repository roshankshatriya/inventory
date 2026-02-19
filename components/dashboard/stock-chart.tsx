"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { monthlyStock } from "./data";

export default function StockChart() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Stock Movement</h3>
                <p className="text-xs text-gray-500">Stock added vs sold per month</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyStock} barCategoryGap="30%">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar dataKey="added" name="Stock Added" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sold" name="Sold" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
