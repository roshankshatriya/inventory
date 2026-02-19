import Link from "next/link";
import { getProducts } from "@/lib/products";
import PublicNavbar from "@/components/public-navbar";
import { Package, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; category?: string }>;
}) {
    const params = await searchParams;
    const q = (params.q ?? "").trim().toLowerCase();
    const selectedCategory = params.category ?? "";

    const allProducts = getProducts();
    const categories = [...new Set(allProducts.map((p) => p.category))].sort();

    const filtered = allProducts.filter((p) => {
        const matchQ =
            !q ||
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q);
        const matchCat = !selectedCategory || p.category === selectedCategory;
        return matchQ && matchCat;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            {/* Hero strip */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-800 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
                    <p className="text-purple-200 text-sm mb-6">
                        {allProducts.length} products across {categories.length} categories
                    </p>

                    {/* Search */}
                    <form
                        method="GET"
                        action="/products"
                        className="flex gap-2 max-w-lg"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                name="q"
                                defaultValue={q}
                                placeholder="Search products…"
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                            {selectedCategory && (
                                <input type="hidden" name="category" value={selectedCategory} />
                            )}
                        </div>
                        <button className="bg-white text-purple-700 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-purple-50 transition-colors">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar filter */}
                    <aside className="md:w-52 flex-shrink-0">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Category
                        </h3>
                        <div className="space-y-1">
                            <Link
                                href={q ? `/products?q=${q}` : "/products"}
                                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory
                                        ? "bg-purple-600 text-white font-medium"
                                        : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                All ({allProducts.length})
                            </Link>
                            {categories.map((cat) => {
                                const count = allProducts.filter(
                                    (p) => p.category === cat
                                ).length;
                                const href = `/products?category=${encodeURIComponent(cat)}${q ? `&q=${q}` : ""}`;
                                return (
                                    <Link
                                        key={cat}
                                        href={href}
                                        className={`block px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat
                                                ? "bg-purple-600 text-white font-medium"
                                                : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        {cat} ({count})
                                    </Link>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Products grid */}
                    <main className="flex-1">
                        {filtered.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <Package className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                                <p className="font-medium text-gray-500">No products found.</p>
                                <p className="text-sm mt-1">
                                    Try a different search or{" "}
                                    <Link href="/products" className="text-purple-600 hover:underline">
                                        clear filters
                                    </Link>
                                    .
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {filtered.map((product) => {
                                    const isLow =
                                        product.lowStockAt > 0 &&
                                        product.quantity <= product.lowStockAt;
                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.id}`}
                                            className="group bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
                                        >
                                            {/* Image */}
                                            <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {product.image ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <Package className="w-14 h-14 text-gray-200" />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 flex flex-col flex-1">
                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                    <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors leading-snug">
                                                        {product.name}
                                                    </h3>
                                                    {isLow && (
                                                        <span className="text-xs bg-red-50 text-red-500 font-medium px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                                                            Low Stock
                                                        </span>
                                                    )}
                                                </div>

                                                {product.sku && (
                                                    <p className="text-xs text-gray-400 font-mono mb-2">
                                                        {product.sku}
                                                    </p>
                                                )}

                                                <span className="inline-block text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-0.5 rounded-full mb-3 self-start">
                                                    {product.category}
                                                </span>

                                                {product.description && (
                                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                                                        {product.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                                                    <span className="text-xl font-bold text-gray-900">
                                                        ${product.price.toFixed(2)}
                                                    </span>
                                                    <div className="text-right">
                                                        <span
                                                            className={`text-xs font-semibold px-2 py-1 rounded-lg ${isLow
                                                                    ? "bg-red-50 text-red-600"
                                                                    : "bg-green-50 text-green-700"
                                                                }`}
                                                        >
                                                            {product.quantity} in stock
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
