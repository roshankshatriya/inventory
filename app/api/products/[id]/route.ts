import { NextRequest, NextResponse } from "next/server";
import { deleteProduct } from "@/lib/products";

/** DELETE /api/products/[id] — remove a product */
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const deleted = deleteProduct(id);
        if (!deleted) {
            return NextResponse.json({ error: "Product not found." }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
