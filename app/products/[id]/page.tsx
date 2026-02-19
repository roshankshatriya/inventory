import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import PublicNavbar from "@/components/public-navbar";
import {
    Package,
    ArrowLeft,
    Tag,
    Hash,
    Layers,
    AlertTriangle,
    CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const products = getProducts();
    const product = products.find((p) => p.id === id);

    if (!product) notFound();

    const isLow =
        product.lowStockAt > 0 && product.quantity <= product.lowStockAt;

    // Related products (same category, excluding current)
    const related = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                    <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-gray-600 transition-colors">Products</Link>
                    <span>/</span>
                    <span className="text-gray-700 font-medium">{product.name}</span>
                </nav>

                {/* Main product detail */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image */}
                        <div className="h-80 lg:h-auto min-h-[360px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                            {product.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-4 text-gray-300">
                                    <Package className="w-20 h-20" />
                                    <span className="text-sm">No image available</span>
                                </div>
                            )}
                        </div>

                        {/* Details */}
                        <div className="p-8 lg:p-10 flex flex-col">
                            {/* Category + stock badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">
                                    {product.category}
                                </span>
                                {isLow ? (
                                    <span className="flex items-center gap-1 text-xs bg-red-50 text-red-500 font-semibold px-3 py-1 rounded-full">
                                        <AlertTriangle className="w-3 h-3" />
                                        Low Stock
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs bg-green-50 text-green-600 font-semibold px-3 py-1 rounded-full">
                                        <CheckCircle2 className="w-3 h-3" />
                                        In Stock
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                                {product.name}
                            </h1>

                            {product.description && (
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    {product.description}
                                </p>
                            )}

                            {/* Price */}
                            <div className="text-4xl font-extrabold text-purple-600 mb-8">
                                ${product.price.toFixed(2)}
                                <span className="text-sm font-normal text-gray-400 ml-2">
                                    per unit
                                </span>
                            </div>

                            {/* Metadata grid */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {[
                                    {
                                        icon: Layers,
                                        label: "Quantity in Stock",
                                        value: String(product.quantity),
                                        highlight: isLow,
                                    },
                                    {
                                        icon: Hash,
                                        label: "SKU",
                                        value: product.sku || "—",
                                        highlight: false,
                                    },
                                    {
                                        icon: Tag,
                                        label: "Category",
                                        value: product.category,
                                        highlight: false,
                                    },
                                    {
                                        icon: AlertTriangle,
                                        label: "Low Stock At",
                                        value: product.lowStockAt > 0 ? String(product.lowStockAt) : "—",
                                        highlight: false,
                                    },
                                ].map(({ icon: Icon, label, value, highlight }) => (
                                    <div
                                        key={label}
                                        className={`rounded-xl p-4 border ${highlight
                                                ? "border-red-100 bg-red-50"
                                                : "border-gray-100 bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <Icon
                                                className={`w-3.5 h-3.5 ${highlight ? "text-red-400" : "text-gray-400"}`}
                                            />
                                            <span className="text-xs text-gray-400 font-medium">
                                                {label}
                                            </span>
                                        </div>
                                        <p
                                            className={`text-sm font-semibold ${highlight ? "text-red-700" : "text-gray-800"}`}
                                        >
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto flex gap-3">
                                <Link
                                    href="/products"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Products
                                </Link>
                                <Link
                                    href="/signin"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-colors"
                                >
                                    Manage Inventory
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-5">
                            More in {product.category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {related.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.id}`}
                                    className="group bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 overflow-hidden"
                                >
                                    <div className="h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                                        {p.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={p.image}
                                                alt={p.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <Package className="w-10 h-10 text-gray-200" />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">
                                            {p.name}
                                        </h3>
                                        <p className="text-purple-600 font-bold mt-1">
                                            ${p.price.toFixed(2)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
