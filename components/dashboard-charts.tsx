"use client";

import {
    Package,
    TrendingUp,
    AlertTriangle,
    Tag,
    ShoppingCart,
    DollarSign,
} from "lucide-react";

import StatCard from "./dashboard/stat-card";
import RevenueChart from "./dashboard/revenue-chart";
import CategoryPie from "./dashboard/category-pie";
import StockChart from "./dashboard/stock-chart";
import TopProducts from "./dashboard/top-products";
import RecentProductsTable from "./dashboard/recent-products";
import LowStockAlerts from "./dashboard/low-stock-alerts";
import {
    totalProducts,
    totalStockValue,
    totalCategories,
    currentRevenue,
    currentOrders,
    revenueGrowth,
    lowStockAlerts,
} from "./dashboard/data";

export default function DashboardCharts() {
    return (
        <div className="space-y-6">

            {/* ── Row 1: Primary KPI Cards ── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    label="Total Products"
                    value={String(totalProducts)}
                    sub="2 added this week"
                    up={true}
                    icon={Package}
                    iconBg="bg-purple-50"
                    iconColor="text-purple-600"
                />
                <StatCard
                    label="Stock Value"
                    value={`$${totalStockValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                    sub="vs last month"
                    up={true}
                    icon={DollarSign}
                    iconBg="bg-green-50"
                    iconColor="text-green-600"
                />
                <StatCard
                    label="Low Stock Items"
                    value={String(lowStockAlerts.length)}
                    sub="Need restocking"
                    up={false}
                    icon={AlertTriangle}
                    iconBg="bg-red-50"
                    iconColor="text-red-500"
                />
                <StatCard
                    label="Categories"
                    value={String(totalCategories)}
                    sub="Across all products"
                    icon={Tag}
                    iconBg="bg-indigo-50"
                    iconColor="text-indigo-600"
                />
            </div>

            {/* ── Row 2: Revenue KPI Cards ── */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    label="Monthly Revenue"
                    value={`$${currentRevenue.toLocaleString()}`}
                    sub={`${Number(revenueGrowth) >= 0 ? "+" : ""}${revenueGrowth}% vs last month`}
                    up={Number(revenueGrowth) >= 0}
                    icon={TrendingUp}
                    iconBg="bg-blue-50"
                    iconColor="text-blue-600"
                />
                <StatCard
                    label="Monthly Orders"
                    value={String(currentOrders)}
                    sub="+14 vs last month"
                    up={true}
                    icon={ShoppingCart}
                    iconBg="bg-amber-50"
                    iconColor="text-amber-600"
                />
                <StatCard
                    label="Avg. Order Value"
                    value={`$${(currentRevenue / currentOrders).toFixed(0)}`}
                    sub="Per transaction"
                    icon={DollarSign}
                    iconBg="bg-teal-50"
                    iconColor="text-teal-600"
                />
                <StatCard
                    label="Total Stock Units"
                    value="553"
                    sub="+20 added this month"
                    up={true}
                    icon={Package}
                    iconBg="bg-violet-50"
                    iconColor="text-violet-600"
                />
            </div>

            {/* ── Row 3: Revenue chart + Category pie ── */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
                <div className="xl:col-span-3"><RevenueChart /></div>
                <div className="xl:col-span-2"><CategoryPie /></div>
            </div>

            {/* ── Row 4: Stock bar chart + Top products ── */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
                <div className="xl:col-span-3"><StockChart /></div>
                <div className="xl:col-span-2"><TopProducts /></div>
            </div>

            {/* ── Row 5: Recent products + Low stock alerts ── */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
                <div className="xl:col-span-3"><RecentProductsTable /></div>
                <div className="xl:col-span-2"><LowStockAlerts /></div>
            </div>

        </div>
    );
}
