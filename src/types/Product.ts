export const PRODUCT_STATUSES = ["Active", "Sold", "Deleted"] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export const PRODUCT_CONDITIONS = ["New", "Like new", "Used"] as const;

export type ProductCondition = (typeof PRODUCT_CONDITIONS)[number];

export const PRODUCT_CATEGORIES = [
  "Jacket",
  "Sweater",
  "Pants",
  "T-shirt",
  "Shoes",
  "Accessory",
  "Shirt",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export const PRODUCT_GENDERS = ["Male", "Female", "Unisex"] as const;

export type ProductGender = (typeof PRODUCT_GENDERS)[number];

export const PRODUCT_COLORS = [
  "Black",
  "White",
  "Gray",
  "Blue",
  "Red",
  "Green",
  "Yellow",
  "Brown",
  "Beige",
  "Pink",
  "Purple",
  "Orange",
  "Colorful",
] as const;

export type ProductColor = (typeof PRODUCT_COLORS)[number];

export const PRODUCT_SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",

  "36",
  "38",
  "40",
  "42",
  "44",
  "46",
] as const;

export type ProductSize = (typeof PRODUCT_SIZES)[number];

/* PRODUCT INTERFACE */

export interface Product {
  id: number;
  title: string;
  description: string;
  category: ProductCategory;
  condition: ProductCondition;
  gender: ProductGender;
  colors: ProductColor[];
  size: ProductSize;
  brand: string;
  price: number;
  images: string[];
  status: ProductStatus;
  sellerId: number;
  isFavorite?: boolean;
}
