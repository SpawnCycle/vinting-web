import type { Product } from "../types/Product";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";
const USE_BACKEND = Boolean(BASE_URL);

export type ProductFilters = {
    sellerId?: number;
    search?: string;
    brand?: string;
    color?: string;
    category?: string;
    status?: "active" | "sold";
};

export async function getProducts( filters?: ProductFilters ): Promise<Product[]> {
    // most json
    if (!USE_BACKEND) {
        const res = await fetch("/data/products.json");
        let data: Product[] = await res.json();

        // szűrés (mint backendnél majd)
        if (filters?.sellerId !== undefined) {
        data = data.filter(p => p.sellerId === filters.sellerId);
        }

        if (filters?.status) {
        data = data.filter(p => p.status === filters.status);
        }

        if (filters?.category) {
        data = data.filter(p => p.category === filters.category);
        }

        if (filters?.brand) {
        data = data.filter(p => p.brand === filters.brand);
        }

        if (filters?.color) {
        data = data.filter(p => p.color === filters.color);
        }

        if (filters?.search) {
        const q = filters.search.toLowerCase();
        data = data.filter(
            p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        );
        }

        return data;
    }

    // majd h lesz backend
    const params = new URLSearchParams();

    if (filters?.sellerId !== undefined)
        params.append("sellerId", String(filters.sellerId));

    if (filters?.status) 
        params.append("status", filters.status);

    if (filters?.category) 
        params.append("category", filters.category);

    if (filters?.brand) 
        params.append("brand", filters.brand);

    if (filters?.color) 
        params.append("color", filters.color);

    if (filters?.search) 
        params.append("q", filters.search);

    const url = `${BASE_URL}/products?${params.toString()}`;

    const res = await fetch(url);
    return res.json();
}