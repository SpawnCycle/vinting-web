import type {
  ProductCondition,
  ProductGender,
  ProductColor,
  ProductSize,
} from "./productEnums";

export interface CreateProductForm {
  title: string;
  description: string;
  brand: string;
  categories: string[]; // NAME!
  condition: ProductCondition;
  gender: ProductGender;
  size: ProductSize;
  color: ProductColor;
  price: number;
  images: File[];
  tags: number[];
  stock: number;
}
