"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Zap,
    BarChart3,
    ShieldCheck,
    Package2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const slides = [
    {
        badge: { icon: Zap, text: "Smart Inventory Management" },
        headline: (
            <>
                Manage Your <span className="text-purple-300">Inventory</span>{" "}
                Effortlessly
            </>
        ),
        subtext:
            "Track products, monitor stock levels, get low-stock alerts, and analyse your inventory data — all in one beautiful dashboard.",
        primaryBtn: { label: "Browse Products", href: "/products" },
        secondaryBtn: { label: "Sign In to Manage", href: "/signin" },
    },
    {
        badge: { icon: BarChart3, text: "Real-Time Analytics" },
        headline: (
            <>
                Data-Driven <span className="text-indigo-300">Decisions</span> at a
                Glance
            </>
        ),
        subtext:
            "Revenue charts, stock movement graphs, and category breakdowns update in real time so you always know where you stand.",
        primaryBtn: { label: "View Dashboard", href: "/signin" },
        secondaryBtn: { label: "Explore Products", href: "/products" },
    },
    {
        badge: { icon: ShieldCheck, text: "Never Run Out Again" },
        headline: (
            <>
                Smart <span className="text-green-300">Low-Stock</span> Alerts Built In
            </>
        ),
        subtext:
            "Set custom thresholds per product. InventoryPro alerts you automatically before you run out — keeping your business running smoothly.",
        primaryBtn: { label: "Get Started", href: "/signin" },
        secondaryBtn: { label: "See Features", href: "/#why-choose-us" },
    },
    {
        badge: { icon: Package2, text: "Visual Product Catalogue" },
        headline: (
            <>
                Your Products, <span className="text-amber-300">Beautifully</span>{" "}
                Organised
            </>
        ),
        subtext:
            "Upload images, write rich descriptions, assign SKUs and categories. A clean catalogue your whole team will love to use.",
        primaryBtn: { label: "Browse Catalogue", href: "/products" },
        secondaryBtn: { label: "Sign In", href: "/signin" },
    },
];

interface HeroCarouselProps {
    totalProducts: number;
    totalCategories: number;
    totalStockValue: string;
    lowStock: number;
}

export default function HeroCarousel({
    totalProducts,
    totalCategories,
    totalStockValue,
    lowStock,
}: HeroCarouselProps) {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const goTo = useCallback(
        (index: number) => {
            if (animating || index === current) return;
            setAnimating(true);
            setTimeout(() => {
                setCurrent(index);
                setAnimating(false);
            }, 300);
        },
        [animating, current]
    );

    const next = useCallback(() => {
        goTo((current + 1) % slides.length);
    }, [current, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + slides.length) % slides.length);
    }, [current, goTo]);

    useEffect(() => {
        const interval = setInterval(next, 4500);
        return () => clearInterval(interval);
    }, [next]);

    const slide = slides[current];
    const BadgeIcon = slide.badge.icon;

    return (
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_60%)] pointer-events-none" />

            {/* Slide content */}
            <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36">
                <div
                    className="max-w-3xl transition-all duration-300"
                    style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(12px)" : "translateY(0)" }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 text-purple-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {slide.badge.text}
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                        {slide.headline}
                    </h1>

                    {/* Sub-text */}
                    <p className="text-lg text-purple-200 mb-10 max-w-xl leading-relaxed">
                        {slide.subtext}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={slide.primaryBtn.href}
                            className="flex items-center gap-2 bg-white text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors shadow-lg"
                        >
                            {slide.primaryBtn.label}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href={slide.secondaryBtn.href}
                            className="flex items-center gap-2 bg-purple-600/50 hover:bg-purple-600/70 text-white font-semibold px-6 py-3 rounded-xl border border-purple-400/30 transition-colors"
                        >
                            {slide.secondaryBtn.label}
                        </Link>
                    </div>
                </div>

                {/* Navigation controls */}
                <div className="flex items-center gap-4 mt-12">
                    {/* Dots */}
                    <div className="flex items-center gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`transition-all duration-300 rounded-full ${i === current
                                        ? "w-8 h-2.5 bg-white"
                                        : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Prev / Next */}
                    <div className="flex items-center gap-2 ml-2">
                        <button
                            onClick={prev}
                            aria-label="Previous slide"
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 text-white" />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next slide"
                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats strip */}
            <div className="relative border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { label: "Total Products", value: String(totalProducts) },
                        { label: "Categories", value: String(totalCategories) },
                        { label: "Total Stock Value", value: totalStockValue },
                        { label: "Low Stock Alerts", value: String(lowStock) },
                    ].map(({ label, value }) => (
                        <div key={label}>
                            <p className="text-3xl font-extrabold text-white">{value}</p>
                            <p className="text-purple-300 text-sm mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
