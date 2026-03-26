import type { ProductUI } from "../types/Product/ProductUI";
import type { ProductDto, ProductPagination } from "@/types/Product/ProductDto";
import { mapProduct } from "@/types/Product/productMapper";
import type { CreateProductForm } from "@/types/Product/CreateProductForm";
import { uploadImage } from "./imagesApi";
import { getCategories } from "./categoriesApi";
import type { UpdateProductDto } from "@/types/Product/UpdateProductDto";

const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === "true";

export type ProductFilters = {
  id?: number;
  sellerId?: number;
  search?: string;
  color?: string[];
  categories?: string[];
  condition?: string[];
  gender?: string;
  size?: string;
};

export async function getProducts(
  filters?: ProductFilters,
): Promise<ProductUI[]> {
  if (!USE_BACKEND) {
    const res = await fetch("/data/products.json");
    let data: ProductUI[] = await res.json();

    if (filters?.id !== undefined) {
      data = data.filter((p) => p.id === filters.id);
    }

    if (filters?.sellerId !== undefined) {
      data = data.filter((p) => p.sellerId === filters.sellerId);
    }

    if (filters?.categories?.length) {
      data = data.filter((p) =>
        filters.categories!.includes((p as any).category),
      );
    }

    if (filters?.gender) {
      data = data.filter((p) => p.gender === filters.gender);
    }

    if (filters?.size) {
      data = data.filter((p) => p.size === filters.size);
    }

    if (filters?.color?.length) {
      data = data.filter((p) =>
        filters.color!.some((c) => (p as any).colors?.includes(c)),
      );
    }

    if (filters?.condition?.length) {
      data = data.filter((p) =>
        filters.condition!.includes((p as any).condition),
      );
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();

      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    return data;
  }

  //BACKEND
  const params = new URLSearchParams();

  if (filters?.gender) params.append("gender", filters.gender);

  if (filters?.size) params.append("size", filters.size);

  if (filters?.color?.length) {
    filters.color.forEach((c) => {
      params.append("color", c);
    });
  }

  if (filters?.categories?.length) {
    filters.categories.forEach((c) => {
      params.append("categories", c);
    });
  }

  if (filters?.search) {
    params.append("query", `%${filters.search}%`);
  }

  const res = await fetch(`/api/products?${params.toString()}`);
  const data: ProductPagination = await res.json();

  return data.data.map(mapProduct);
}

export async function getProductsPaginated(filters?: ProductFilters): Promise<{
  products: ProductUI[];
  pages: number;
  items: number;
}> {
  if (!USE_BACKEND) {
    const res = await fetch("/data/products.json");
    let data: ProductUI[] = await res.json();

    if (filters?.id !== undefined) {
      data = data.filter((p) => p.id === filters.id);
    }

    if (filters?.sellerId !== undefined) {
      data = data.filter((p) => p.sellerId === filters.sellerId);
    }

    if (filters?.categories?.length) {
      data = data.filter((p) =>
        filters.categories!.includes((p as any).category),
      );
    }

    if (filters?.gender) {
      data = data.filter((p) => p.gender === filters.gender);
    }

    if (filters?.size) {
      data = data.filter((p) => p.size === filters.size);
    }

    if (filters?.color?.length) {
      data = data.filter((p) =>
        filters.color!.some((c) => (p as any).colors?.includes(c)),
      );
    }

    if (filters?.condition?.length) {
      data = data.filter((p) =>
        filters.condition!.includes((p as any).condition),
      );
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();

      data = data.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }

    return {
      products: data,
      pages: 1,
      items: data.length,
    };
  }

  const params = new URLSearchParams();

  if (filters?.gender) params.append("gender", filters.gender);

  if (filters?.size) params.append("size", filters.size);

  if (filters?.color?.length) {
    filters.color.forEach((c) => {
      params.append("color", c);
    });
  }

  if (filters?.categories?.length) {
    filters.categories.forEach((c) => {
      params.append("categories", c);
    });
  }

  if (filters?.search) {
    params.append("query", `%${filters.search}%`);
  }

  const res = await fetch(`/api/products?${params.toString()}`);
  const data: ProductPagination = await res.json();

  return {
    products: data.data.map(mapProduct),
    pages: data.pages,
    items: data.items,
  };
}

export async function getProductById(id: number): Promise<ProductUI | null> {
  if (!USE_BACKEND) {
    const res = await fetch("/data/products.json");
    const data: ProductUI[] = await res.json();

    return data.find((p) => p.id === id) ?? null;
  }

  //BACKEND:
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok) {
    return null;
  }

  const data: ProductDto = await res.json();
  return mapProduct(data);
}

export async function getProductByUser(
  id: number,
): Promise<ProductUI[] | null> {
  if (!USE_BACKEND) {
    const res = await fetch("/data/products.json");
    const data: ProductUI[] = await res.json();

    return data.filter((p) => p.sellerId === id) ?? null;
  }

  //BACKEND:
  const res = await fetch(`/api/users/${id}/products`);

  if (!res.ok) {
    return null;
  }

  const data: ProductDto[] = await res.json();
  return data.map(mapProduct);
}

export async function createProduct(form: CreateProductForm) {
  if (!USE_BACKEND) {
    console.log("create (mock): ", form);
    return null;
  }

  const imageIds: number[] = [];

  for (const file of form.images) {
    const id = await uploadImage(file);
    imageIds.push(id);
  }

  const allCategories = await getCategories();

  const categoryIds = (form.categories ?? [])
    .map((name) => {
      const found = allCategories.find((c) => c.name === name);
      return found?.id;
    })
    .filter((id): id is number => Boolean(id));

  const dto = {
    name: form.title,
    description: form.description,
    price: form.price,
    size: form.size,
    color: form.color,
    brand: form.brand || null,
    condition: form.condition,
    sex: form.gender,
    categories: categoryIds,
    tags: form.tags ?? [],
    images: imageIds,
  };

  const res = await fetch("/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("BACKEND ERROR:", err);
    throw new Error("Product creation failed");
  }

  return res.json();
}

export async function updateProduct(dto: UpdateProductDto): Promise<void> {
  const res = await fetch(`/api/products/${dto.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("UPDATE ERROR:", err);
    throw new Error("Product update failed");
  }
}

export async function deleteProduct(productId: number) {
  console.log("delete: ", productId);
  return null;
}
