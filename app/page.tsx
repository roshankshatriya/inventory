import Link from "next/link";
import { getProducts } from "@/lib/products";
import PublicNavbar from "@/components/public-navbar";
import HeroCarousel from "@/components/hero-carousel";
import {
  Package2,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Package,
  Users,
  Clock,
  Globe,
  Star,
  BarChart3,
  Headphones,
  Lock,
  Layers,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const products = getProducts();
  const featured = products.slice(0, 6);
  const totalCategories = new Set(products.map((p) => p.category)).size;
  const lowStock = products.filter((p) => p.quantity <= p.lowStockAt).length;
  const totalStockValue = `$${products
    .reduce((s, p) => s + p.price * p.quantity, 0)
    .toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* ══ AUTO-RUNNING HERO CAROUSEL ══ */}
      <HeroCarousel
        totalProducts={products.length}
        totalCategories={totalCategories}
        totalStockValue={totalStockValue}
        lowStock={lowStock}
      />

      {/* ══ FEATURED PRODUCTS ══ */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide mb-1">
              In Stock
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p>No products yet.</p>
            <Link
              href="/signin"
              className="mt-3 inline-block text-purple-600 hover:underline text-sm"
            >
              Sign in to add products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => {
              const isLow =
                product.lowStockAt > 0 &&
                product.quantity <= product.lowStockAt;
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-200 overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <Package className="w-14 h-14 text-gray-300" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors leading-tight">
                        {product.name}
                      </h3>
                      {isLow && (
                        <span className="text-xs bg-red-50 text-red-500 font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                          Low Stock
                        </span>
                      )}
                    </div>
                    <span className="inline-block text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-0.5 rounded-full mb-3">
                      {product.category}
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {product.quantity} in stock
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ══ ABOUT US ══ */}
      <section
        id="about"
        className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden"
      >
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-purple-300 text-sm font-semibold uppercase tracking-widest mb-4">
                About Us
              </p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
                Built for Businesses That Mean Business
              </h2>
              <p className="text-purple-200 text-lg leading-relaxed mb-6">
                InventoryPro was born out of a simple frustration — managing
                stock in spreadsheets and losing track of what's in and out.
                We built a platform that gives every business owner, big or
                small, the tools of an enterprise without the enterprise price
                tag.
              </p>
              <p className="text-purple-200 leading-relaxed mb-8">
                From a garage startup to a multi-location retailer, InventoryPro
                scales with you. Our team is passionate about clean software,
                actionable data, and a support experience that actually feels
                human.
              </p>
              <div className="flex flex-wrap gap-8">
                {[
                  { icon: Users, value: "5,000+", label: "Active Users" },
                  { icon: Globe, value: "40+", label: "Countries" },
                  { icon: Clock, value: "99.9%", label: "Uptime SLA" },
                  { icon: Star, value: "4.9★", label: "Avg. Rating" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-purple-300" />
                      <span className="text-2xl font-extrabold text-white">
                        {value}
                      </span>
                    </div>
                    <span className="text-xs text-purple-300 font-medium">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: TrendingUp,
                  title: "Founded 2021",
                  desc: "Started with a vision to democratise inventory intelligence for SMBs.",
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  desc: "Real humans ready to help via chat, email, or phone — any time of day.",
                },
                {
                  icon: Lock,
                  title: "SOC 2 Ready",
                  desc: "Your data is stored securely with enterprise-grade encryption at rest.",
                },
                {
                  icon: Layers,
                  title: "API-First",
                  desc: "Connect InventoryPro to your existing tools via our open REST API.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-500/30 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-purple-200" />
                  </div>
                  <h4 className="text-white font-semibold mb-1">{title}</h4>
                  <p className="text-purple-300 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ══ */}
      <section id="why-choose-us" className="bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-purple-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Why Choose Us
            </p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need, Nothing You Don&apos;t
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
              InventoryPro is purpose-built for clarity and speed. Here&apos;s
              what sets us apart from generic solutions.
            </p>
          </div>

          {/* 6-card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                color: "text-purple-600",
                bg: "bg-purple-50",
                border: "border-purple-100",
                title: "Real-Time Analytics",
                desc: "Revenue charts, stock movement graphs, and category breakdowns update the moment you save a product. No lag, no guesswork.",
                highlight: "Live dashboards",
              },
              {
                icon: ShieldCheck,
                color: "text-green-600",
                bg: "bg-green-50",
                border: "border-green-100",
                title: "Smart Low-Stock Alerts",
                desc: "Set a custom threshold per product. InventoryPro alerts you automatically so you never run out of your best sellers again.",
                highlight: "Per-product thresholds",
              },
              {
                icon: Package2,
                color: "text-blue-600",
                bg: "bg-blue-50",
                border: "border-blue-100",
                title: "Visual Catalogue",
                desc: "Upload product images, write rich descriptions, and organise by category. A catalogue your whole team will actually enjoy using.",
                highlight: "Image upload",
              },
              {
                icon: Zap,
                color: "text-amber-600",
                bg: "bg-amber-50",
                border: "border-amber-100",
                title: "Lightning-Fast UI",
                desc: "Built with Next.js and optimised for performance. Pages load in under 200 ms — even with thousands of products.",
                highlight: "Sub-200 ms loads",
              },
              {
                icon: Lock,
                color: "text-rose-600",
                bg: "bg-rose-50",
                border: "border-rose-100",
                title: "Secure by Default",
                desc: "Role-based access control, encrypted sessions, and secure API routes ensure only authorised users can touch your data.",
                highlight: "Enterprise-grade security",
              },
              {
                icon: Headphones,
                color: "text-teal-600",
                bg: "bg-teal-50",
                border: "border-teal-100",
                title: "Human Support",
                desc: "Talk to a real person whenever you need help. No bots, no ticket queues — just fast, friendly responses from our expert team.",
                highlight: "24/7 real support",
              },
            ].map(({ icon: Icon, color, bg, border, title, desc, highlight }) => (
              <div
                key={title}
                className={`bg-white rounded-2xl border ${border} p-6 hover:shadow-lg transition-all duration-200 group`}
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${color}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES STRIP ══ */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            icon: TrendingUp,
            color: "text-purple-600",
            bg: "bg-purple-50",
            title: "Live Analytics",
            desc: "Revenue charts, stock movement graphs, and category breakdowns in real time.",
          },
          {
            icon: ShieldCheck,
            color: "text-green-600",
            bg: "bg-green-50",
            title: "Low-Stock Alerts",
            desc: "Automatic alerts when products fall below your custom threshold. Never run out again.",
          },
          {
            icon: Package2,
            color: "text-blue-600",
            bg: "bg-blue-50",
            title: "Product Images",
            desc: "Upload images for every product. Keep your catalogue visual and professional.",
          },
        ].map(({ icon: Icon, color, bg, title, desc }) => (
          <div key={title} className="flex gap-4">
            <div
              className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ══ CTA ══ */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.3),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Ready to take control of your inventory?
          </h2>
          <p className="text-purple-200 mb-8 max-w-md mx-auto leading-relaxed">
            Sign in to access the full dashboard — charts, alerts, product
            management, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-purple-50 transition-colors shadow-lg text-sm"
            >
              Get Started — Sign In
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-purple-600/50 hover:bg-purple-600/70 text-white font-semibold px-8 py-3.5 rounded-xl border border-purple-400/30 transition-colors text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Package2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900">InventoryPro</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                Smart inventory management for businesses of every size. Track, analyse, and grow.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/products", label: "Products" },
                  { href: "/#about", label: "About Us" },
                  { href: "/#why-choose-us", label: "Why Choose Us" },
                  { href: "/contact", label: "Contact" },
                ].map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="block text-sm text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact snippet */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>📧 hello@inventorypro.io</p>
                <p>📞 +1 (800) 123-4567</p>
                <p>📍 123 Commerce St, San Francisco, CA</p>
                <Link
                  href="/contact"
                  className="inline-block mt-2 text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Send us a message →
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} InventoryPro. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <Link href="/signin" className="hover:text-gray-600 transition-colors">Sign In</Link>
              <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
