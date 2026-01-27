import { Link } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";
import "./ProductGrid.css";
import type { Product } from "../../types/Product";

interface ProductGridProps {
   products: Product[];
   showFavoriteButton?: boolean;
}

const ProductGrid = ({ products, showFavoriteButton = true, }: ProductGridProps) => {
   return (
      <div className="product-grid">
         {products.map((p) => (
            <Link to={`/product/${p.id}`} key={p.id}>
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