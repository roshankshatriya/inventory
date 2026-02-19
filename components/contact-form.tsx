"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

type Field = "name" | "email" | "subject" | "message";

interface FormState {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const errors: Partial<Record<Field, string>> = {};
    if (touched.name && !form.name.trim()) errors.name = "Name is required.";
    if (touched.email) {
        if (!form.email.trim()) errors.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errors.email = "Enter a valid email address.";
    }
    if (touched.subject && !form.subject.trim()) errors.subject = "Subject is required.";
    if (touched.message && form.message.trim().length < 10)
        errors.message = "Message must be at least 10 characters.";

    const isValid = !errors.name && !errors.email && !errors.subject && !errors.message
        && form.name.trim() && form.email.trim() && form.subject.trim() && form.message.trim().length >= 10;

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Mark all as touched to show validation
        setTouched({ name: true, email: true, subject: true, message: true });
        if (!isValid) return;

        setStatus("loading");
        // Simulate network delay (replace with actual backend call if needed)
        await new Promise((r) => setTimeout(r, 1500));
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTouched({});
    }

    if (status === "success") {
        return (
            <div className="bg-white rounded-2xl border border-green-100 p-10 text-center shadow-sm">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent!
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto mb-6">
                    Thank you for reaching out. Our team will get back to you within 24
                    hours at the email address you provided.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                >
                    Send another message →
                </button>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6"
        >
            {status === "error" && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    Something went wrong. Please try again or email us directly.
                </div>
            )}

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                    <label htmlFor="cf-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="cf-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Roshan Shatriya"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200"
                            }`}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="cf-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                        Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                        id="cf-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="roshan@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200"
                            }`}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>
            </div>

            {/* Subject */}
            <div>
                <label htmlFor="cf-subject" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Subject <span className="text-red-400">*</span>
                </label>
                <select
                    id="cf-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none bg-white ${errors.subject ? "border-red-300 bg-red-50" : "border-gray-200"
                        } ${!form.subject ? "text-gray-400" : "text-gray-900"}`}
                >
                    <option value="" disabled>
                        Select a topic…
                    </option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing & Pricing">Billing &amp; Pricing</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                </select>
                {errors.subject && (
                    <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
                )}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="cf-message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Message <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="cf-message"
                    name="message"
                    rows={6}
                    placeholder="Tell us how we can help you…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none ${errors.message ? "border-red-300 bg-red-50" : "border-gray-200"
                        }`}
                />
                <div className="flex justify-between mt-1">
                    {errors.message ? (
                        <p className="text-xs text-red-500">{errors.message}</p>
                    ) : (
                        <span />
                    )}
                    <p className="text-xs text-gray-400">
                        {form.message.length} chars
                    </p>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm shadow-md"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                    </>
                ) : (
                    <>
                        Send Message
                        <Send className="w-4 h-4" />
                    </>
                )}
            </button>

            <p className="text-center text-xs text-gray-400">
                We typically reply within <strong className="text-gray-500">24 hours</strong> on business days.
            </p>
        </form>
    );
}
