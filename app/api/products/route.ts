import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/products";

/** GET /api/products — list all products */
export async function GET() {
    try {
        const products = getProducts();
        return NextResponse.json(products);
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}

/** POST /api/products — add a new product */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { name, sku, price, quantity, lowStockAt, category, description, image } = body;

        if (!name || price === undefined || quantity === undefined) {
            return NextResponse.json(
                { error: "name, price, and quantity are required." },
                { status: 400 }
            );
        }

        const product = addProduct({
            name: String(name).trim(),
            sku: String(sku ?? "").trim(),
            price: Number(price),
            quantity: Number(quantity),
            lowStockAt: Number(lowStockAt ?? 0),
            category: String(category ?? "Other").trim(),
            description: String(description ?? "").trim(),
            image: image ?? null,
        });

        return NextResponse.json(product, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
