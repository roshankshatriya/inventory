"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ productId }: { productId: string }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this product?")) return;
        setDeleting(true);
        try {
            await fetch(`/api/products/${productId}`, { method: "DELETE" });
            router.refresh(); // re-fetch server component data
        } catch {
            alert("Failed to delete.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
        >
            <Trash2 className="w-4 h-4 inline-block mr-1" />
            {deleting ? "…" : "Delete"}
        </button>
    );
}
