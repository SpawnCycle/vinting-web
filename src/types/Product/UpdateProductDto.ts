export interface UpdateProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  size: string;
  brand: string;
  condition: string;
  sex: string;
  categories: number[];
  tags: number[];
  images: number[];
  has_stock: boolean;
  color: string;
  stock_available: number;
  stock: number;
}
