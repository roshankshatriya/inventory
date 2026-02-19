import fs from "fs";
import path from "path";

export interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    lowStockAt: number;
    category: string;
    description: string;
    image: string | null; // base64 data-url or null
    createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

/** Ensure the data directory and file exist */
function ensureFile() {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

export function getProducts(): Product[] {
    ensureFile();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Product[];
}

export function addProduct(product: Omit<Product, "id" | "createdAt">): Product {
    ensureFile();
    const products = getProducts();
    const newProduct: Product = {
        ...product,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct); // newest first
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
    return newProduct;
}

export function deleteProduct(id: string): boolean {
    ensureFile();
    const products = getProducts();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), "utf-8");
    return true;
}
