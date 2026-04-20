export type ProductQuery = {
  gender?: string;
  size?: string;
  color?: string;
  condition?: string;
  categories?: string[];
  page?: number;
  page_size?: number;
  search?: string;
};
