import PublicNavbar from "@/components/public-navbar";
import ContactForm from "@/components/contact-form";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Package2,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Contact Us — InventoryPro",
    description:
        "Get in touch with the InventoryPro team. We're here to help with any questions about our inventory management platform.",
};

const contactInfo = [
    {
        icon: Phone,
        label: "Phone",
        value: "+1 (800) 123-4567",
        sub: "Mon–Fri, 9 am–6 pm PST",
        href: "tel:+18001234567",
        color: "text-purple-600",
        bg: "bg-purple-50",
    },
    {
        icon: Mail,
        label: "Email",
        value: "hello@inventorypro.io",
        sub: "We reply within 24 hours",
        href: "mailto:hello@inventorypro.io",
        color: "text-indigo-600",
        bg: "bg-indigo-50",
    },
    {
        icon: MapPin,
        label: "Address",
        value: "123 Commerce St",
        sub: "San Francisco, CA 94103, USA",
        href: "https://maps.google.com/?q=San+Francisco,CA",
        color: "text-rose-600",
        bg: "bg-rose-50",
    },
    {
        icon: Clock,
        label: "Business Hours",
        value: "Mon – Fri: 9 am – 6 pm",
        sub: "Closed on US public holidays",
        href: null,
        color: "text-teal-600",
        bg: "bg-teal-50",
    },
];

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            {/* ── Hero ── */}
            <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.2),transparent_60%)] pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 text-center">
                    <p className="text-purple-300 text-sm font-semibold uppercase tracking-widest mb-4">
                        Get In Touch
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
                        We&apos;d Love to Hear From You
                    </h1>
                    <p className="text-purple-200 max-w-lg mx-auto leading-relaxed">
                        Have a question about pricing, features, or your account? Our team
                        is here to help. Fill in the form or reach out directly.
                    </p>
                </div>
            </section>

            {/* ── Main content ── */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* ── Left: Contact Info + Map ── */}
                    <aside className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>

                        {/* Info cards */}
                        {contactInfo.map(({ icon: Icon, label, value, sub, href, color, bg }) => {
                            const inner = (
                                <>
                                    <div
                                        className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
                                    >
                                        <Icon className={`w-5 h-5 ${color}`} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">
                                            {label}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-800">{value}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                                    </div>
                                </>
                            );

                            return href ? (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5 hover:border-purple-200 hover:shadow-md transition-all duration-200"
                                >
                                    {inner}
                                </a>
                            ) : (
                                <div
                                    key={label}
                                    className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-5"
                                >
                                    {inner}
                                </div>
                            );
                        })}

                        {/* Google Map embed */}
                        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                            <iframe
                                title="InventoryPro Office Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50470.06643555124!2d-122.43149380714517!3d37.77492951547403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1708000000000!5m2!1sen!2sus"
                                width="100%"
                                height="260"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </aside>

                    {/* ── Right: Contact Form ── */}
                    <div className="lg:col-span-3">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            Send Us a Message
                        </h2>
                        <ContactForm />
                    </div>
                </div>
            </div>

            {/* ── Footer strip ── */}
            <footer className="border-t border-gray-100 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-600 rounded-md flex items-center justify-center">
                            <Package2 className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-700">InventoryPro</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
                        <Link href="/products" className="hover:text-gray-600 transition-colors">Products</Link>
                        <Link href="/#about" className="hover:text-gray-600 transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
                        <Link
                            href="/signin"
                            className="inline-flex items-center gap-1.5 text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                        >
                            Sign In <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} InventoryPro.
                    </p>
                </div>
            </footer>
        </div>
    );
}
