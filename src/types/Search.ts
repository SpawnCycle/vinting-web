export type FiltersState = {
  gender: string | null;
  sizes: string[];
  colors: string[];
  categories: string[];
  conditions: string[];
  sort: "newest" | "price_asc" | "price_desc";
};
