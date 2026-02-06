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
  condition: string;
  price: number;
  brand: string;
  description: string;
  images: string[];
  status: ProductStatus;
  sellerId: number;

  isFavorite?: boolean; // backendből jövő kedvencekhez
}