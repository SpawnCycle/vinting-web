// BACKEND ENUMS (based on product.rs)

export const PRODUCT_CONDITIONS = [
  "New",
  "Like new",
  "Used",
  "Heavily used",
] as const;

export type ProductCondition = (typeof PRODUCT_CONDITIONS)[number];

export const PRODUCT_GENDERS = ["Male", "Female", "Unisex"] as const;

export type ProductGender = (typeof PRODUCT_GENDERS)[number];

// FRONTEND ENUMS

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
