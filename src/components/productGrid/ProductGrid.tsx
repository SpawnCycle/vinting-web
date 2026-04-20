import { Link } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";
import "./ProductGrid.css";
import type { ProductUI as Product } from "@/types/Product/ProductUI";

type ProductGridProps = {
  products: Product[];
  showFavoriteButton?: boolean;
  returnTo: string;
  parentReturnTo?: string;
};

const ProductGrid = ({
  products,
  returnTo,
  parentReturnTo,
}: ProductGridProps) => {
  return (
    <div className="product-grid">
      {products.map((p) => (
        <Link
          to={`/product/${p.id}`}
          state={{
            returnTo,
            parentReturnTo,
          }}
          key={p.id}
        >
          <ProductCard product={p} />
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
