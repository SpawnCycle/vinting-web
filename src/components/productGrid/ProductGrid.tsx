import { Link } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";
import "./ProductGrid.css";
import type { Product } from "../../types/Product";

type ProductGridProps = {
  products: Product[];
   showFavoriteButton?: boolean;
  returnTo: string;
  parentReturnTo?: string;
};

const ProductGrid = ({ products, showFavoriteButton = true, returnTo, parentReturnTo}: ProductGridProps) => {
   return (
      <div className="product-grid">
         {products.map((p) => (
            <Link 
            to={`/product/${p.id}`}
            state={{
               returnTo,
               parentReturnTo,
            }}
            key={p.id}>
               <ProductCard
                  product={p}
                  showFavoriteButton={showFavoriteButton}
               />
            </Link>
         ))}
      </div>
   );
};

export default ProductGrid;