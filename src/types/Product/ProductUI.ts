import type {
  ProductCondition,
  ProductGender,
  ProductColor,
  ProductSize,
} from "./productEnums";
import type { Tag } from "./Tag";

export interface ProductUI {
  id: number;
  title: string;
  description: string;
  categories: string[]; // N !
  condition: ProductCondition;
  gender: ProductGender;
  color: ProductColor; // 1 !
  size: ProductSize;
  brand: string;
  price: number;
  tags: Tag[];
  images: string[];
  sellerId: number;
  sellerName: string;
  isFavorite?: boolean;
  isAvailable: boolean; // has_stock-ból
  stockAvailable: number; // available_stock-ból
  stockStarting: number; // starting_stock-ból
}
