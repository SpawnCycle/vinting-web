import type { ProductDto } from "./ProductDto";

export function mapProductToEdit(dto: ProductDto) {
  return {
    id: dto.id,
    title: dto.name,
    description: dto.description,
    price: dto.price,
    size: dto.size,
    brand: dto.brand ?? "",
    condition: dto.condition,
    gender: dto.sex,
    color: dto.color,

    categories: dto.categories.map((c) => ({
      id: c.id,
      name: c.name,
    })),

    tags: dto.tags,

    images: dto.images.map((img) => ({
      id: img.id,
      url: img.url,
    })),

    has_stock: dto.has_stock,
  };
}
