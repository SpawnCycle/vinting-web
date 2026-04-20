export type FiltersState = {
  gender: string | null;
  sizes: string[];
  colors: string[];
  categories: string[];
  conditions: string[];
  sort_by: "date" | "price";
  asc: boolean;
};
