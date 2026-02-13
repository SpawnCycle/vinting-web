import type {
  Product,
  ProductCategory,
  ProductColor,
  ProductGender,
  ProductSize,
  ProductStatus,
} from "../types/Product";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";
const USE_BACKEND = Boolean(BASE_URL);

export type ProductFilters = {
  id?: number;
  sellerId?: number;
  search?: string;
  brand?: string;
  color?: ProductColor[];
  category?: ProductCategory;
  gender?: ProductGender;
  size?: ProductSize;
  status?: ProductStatus;
};

export async function getProducts(
  filters?: ProductFilters,
): Promise<Product[]> {
  // MOST - JSON
  if (!USE_BACKEND) {
    const res = await fetch("/data/products.json");
    let data: Product[] = await res.json();

    // szűrések (mint backendnél majd)
    if (filters?.id !== undefined) {
      data = data.filter((p) => p.id === filters.id);
    }

    if (filters?.sellerId !== undefined) {
      data = data.filter((p) => p.sellerId === filters.sellerId);
    }

    if (filters?.status) {
      data = data.filter((p) => p.status === filters.status);
    }

    if (filters?.category) {
      data = data.filter((p) => p.category === filters.category);
    }

    if (filters?.brand) {
      data = data.filter((p) => p.brand === filters.brand);
    }

    if (filters?.gender) {
      data = data.filter((p) => p.gender === filters.gender);
    }

    if (filters?.size) {
      data = data.filter((p) => p.size === filters.size);
    }

    if (filters?.color?.length) {
      data = data.filter((p) =>
        filters.color!.some((c) => p.colors.includes(c)),
      );
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    return data;
  }

  // BACKEND (később)
  const params = new URLSearchParams();

  if (filters?.sellerId !== undefined)
    params.append("sellerId", String(filters.sellerId));

  if (filters?.status) params.append("status", filters.status);

  if (filters?.category) params.append("category", filters.category);

  if (filters?.brand) params.append("brand", filters.brand);

  if (filters?.gender) params.append("gender", filters.gender);

  if (filters?.size) params.append("size", filters.size);

  if (filters?.color?.length) {
    filters.color.forEach((c) => {
      params.append("color", c);
    });
  }

  if (filters?.search) params.append("q", filters.search);

  const url = `${BASE_URL}/products?${params.toString()}`;

  const res = await fetch(url);
  return res.json();
}

export async function updateProduct(
  productId: number,
  data: Partial<Product>,
): Promise<Product> {
  if (!USE_BACKEND) {
    return {
      ...(data as Product),
      id: productId,
    };
  }

  const res = await fetch(`${BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
