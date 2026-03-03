import type {
  ProductGender,
  ProductSize,
  ProductColor,
  ProductCategory,
  ProductCondition,
} from "./Product";

export interface FiltersState {
  gender: ProductGender | null;
  sizes: ProductSize[];
  colors: ProductColor[];
  categories: ProductCategory[];
  conditions: ProductCondition[];
  sort: "newest" | "price-low" | "price-high";
}
