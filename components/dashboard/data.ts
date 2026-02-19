/* ─────────────────────────────────────────────────────────────
   Shared seed data for dashboard components.
   Replace with real DB/API calls as needed.
───────────────────────────────────────────────────────────── */

export const monthlyRevenue = [
    { month: "Aug", revenue: 18400, orders: 52 },
    { month: "Sep", revenue: 22100, orders: 63 },
    { month: "Oct", revenue: 19800, orders: 58 },
    { month: "Nov", revenue: 27500, orders: 81 },
    { month: "Dec", revenue: 34200, orders: 97 },
    { month: "Jan", revenue: 29100, orders: 74 },
    { month: "Feb", revenue: 31800, orders: 88 },
];

export const monthlyStock = [
    { month: "Aug", added: 120, sold: 95, current: 480 },
    { month: "Sep", added: 145, sold: 110, current: 515 },
    { month: "Oct", added: 98, sold: 130, current: 483 },
    { month: "Nov", added: 200, sold: 160, current: 523 },
    { month: "Dec", added: 175, sold: 210, current: 488 },
    { month: "Jan", added: 230, sold: 185, current: 533 },
    { month: "Feb", added: 160, sold: 140, current: 553 },
];

export const categoryData = [
    { name: "Electronics", value: 32, color: "#7c3aed" },
    { name: "Clothing", value: 24, color: "#6366f1" },
    { name: "Home & Garden", value: 18, color: "#0ea5e9" },
    { name: "Sports", value: 14, color: "#10b981" },
    { name: "Books", value: 8, color: "#f59e0b" },
    { name: "Other", value: 4, color: "#6b7280" },
];

export const topProducts = [
    { name: "Wireless Headphones", sku: "EL-001", value: 8400, quantity: 42 },
    { name: "Running Shoes Pro", sku: "SP-012", value: 6750, quantity: 27 },
    { name: "Smart Watch X2", sku: "EL-009", value: 5980, quantity: 23 },
    { name: "Leather Jacket", sku: "CL-005", value: 4320, quantity: 16 },
    { name: "Coffee Maker Pro", sku: "HG-003", value: 3860, quantity: 31 },
];

export const recentProducts = [
    { name: "Wireless Headphones", sku: "EL-001", price: 199.99, quantity: 42, lowStockAt: 10, category: "Electronics" },
    { name: "Running Shoes Pro", sku: "SP-012", price: 249.99, quantity: 27, lowStockAt: 15, category: "Sports" },
    { name: "Leather Jacket", sku: "CL-005", price: 269.99, quantity: 16, lowStockAt: 20, category: "Clothing" },
    { name: "Smart Watch X2", sku: "EL-009", price: 259.99, quantity: 23, lowStockAt: 8, category: "Electronics" },
    { name: "Coffee Maker Pro", sku: "HG-003", price: 124.99, quantity: 31, lowStockAt: 12, category: "Home & Garden" },
    { name: "Yoga Mat Premium", sku: "SP-007", price: 59.99, quantity: 7, lowStockAt: 10, category: "Sports" },
];

export const lowStockAlerts = recentProducts.filter(
    (p) => p.quantity <= p.lowStockAt
);

/* Derived KPIs */
export const totalProducts = recentProducts.length;
export const totalStockValue = recentProducts.reduce((s, p) => s + p.price * p.quantity, 0);
export const totalCategories = new Set(recentProducts.map((p) => p.category)).size;
export const currentRevenue = monthlyRevenue[monthlyRevenue.length - 1].revenue;
export const prevRevenue = monthlyRevenue[monthlyRevenue.length - 2].revenue;
export const revenueGrowth = (((currentRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1);
export const currentOrders = monthlyRevenue[monthlyRevenue.length - 1].orders;
