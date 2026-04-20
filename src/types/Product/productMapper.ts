import type { ProductUI } from "./ProductUI";
import type { ProductDto } from "./ProductDto";
import { PRODUCT_COLORS } from "./productEnums";

export function mapProduct(dto: ProductDto): ProductUI {
  return {
    id: dto.id,
    title: dto.name,
    description: dto.description,
    price: dto.price,
    size: dto.size as ProductUI["size"],
    brand: dto.brand ?? "",
    condition: dto.condition as ProductUI["condition"],
    gender: dto.sex as ProductUI["gender"],

    color: (dto as any).color ?? PRODUCT_COLORS[0],
    images: Array.isArray(dto.images)
      ? dto.images.map((img: any) => img.url)
      : [],
    sellerId: dto.user.id,
    sellerName: dto.user.name,
    categories: Array.isArray(dto.categories)
      ? typeof dto.categories[0] === "string"
        ? dto.categories
        : dto.categories.map((c: any) => c.name)
      : [],
    tags: Array.isArray(dto.tags) ? dto.tags : [],
    isAvailable: dto.has_stock,
    stockAvailable: dto.available_stock,
    stockStarting: dto.starting_stock,
  };
}
