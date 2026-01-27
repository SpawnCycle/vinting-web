export type ProductStatus = "active" | "sold";

export type ProductCondition = "Új" | "Újszerű" | "Használt";

export type ProductCategory =
  | "Kabát"
  | "Pulóver"
  | "Nadrág"
  | "Póló"
  | "Cipő"
  | "Kiegészítő"
  | "Ing";

export interface Product {
  id: number;
  title: string;
  category: ProductCategory;
  color: string;
  condition: ProductCondition;
  price: number;
  brand: string;
  description: string;
  images: string[];
  status: ProductStatus;
  sellerId: number;
}