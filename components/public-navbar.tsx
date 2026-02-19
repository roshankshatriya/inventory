import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import SignOutButton from "./signout-button";
import { Package2, LayoutDashboard } from "lucide-react";

export default async function PublicNavbar() {
    const user = await getCurrentUser();

    return (
        <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                        <Package2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 text-lg">InventoryPro</span>
                </Link>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/products"
                        className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Products
                    </Link>
                    <Link
                        href="/#about"
                        className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        About
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                        Contact
                    </Link>
                    {user && (
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-1.5 text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Auth */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-700">
                                    {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .slice(0, 2)}
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    {user.name.split(" ")[0]}
                                </span>
                            </div>
                            <SignOutButton className="text-sm bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-600 font-medium px-3 py-1.5 rounded-lg transition-colors" />
                        </>
                    ) : (
                        <Link
                            href="/signin"
                            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
