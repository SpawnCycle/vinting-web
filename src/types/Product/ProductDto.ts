export interface ProductDto {
  id: number;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  price: number;
  size: string;
  brand: string | null;
  condition: string;
  sex: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  categories: {
    id: number;
    name: string;
  }[];
  tags: {
    id: number;
    name: string;
  }[];
  images: {
    id: number;
    url: string;
  }[];
  has_stock: boolean;
  color: string;
}
export interface ProductPagination {
  data: ProductDto[];
  items: number;
  pages: number;
}
