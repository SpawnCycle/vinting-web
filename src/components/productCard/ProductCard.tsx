import "./ProductCard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import type { Product } from "../../types/Product";

interface ProductCardProps {
  product: Product;
  showFavoriteButton?: boolean;
}

//code
export default function ProductCard({ product, showFavoriteButton = true, }: ProductCardProps) {
   const [isFavorite, setIsFavorite] = useState<boolean>(false);

   const formatPrice = (value: number): string =>
      new Intl.NumberFormat("hu-HU", {
         style: "currency",
         currency: "HUF",
         maximumFractionDigits: 0,
      }).format(value);

   return (
      <div className="product-card">
         <div className="product-image">
            <img
               src={product.images[0]}
               alt={product.title}
            />
         </div>

         <div className="product-info">
            <p className="product-brand">{product.brand}</p>
            <h2>{product.title}</h2>
            <div className="product-extra">
               <p className="product-condition">{product.condition}</p>
               <p className="product-price">{formatPrice(product.price)}</p>
            </div>
         </div>

         {showFavoriteButton && (
         <button
            className={`favorite-btn ${isFavorite ? "active" : ""}`}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
               e.preventDefault();
               e.stopPropagation();
               setIsFavorite(prev => !prev);
            }}
            aria-label="Favorite"
         >
            {isFavorite ? (
               <AiFillHeart size={20} color="#e60023" />
            ) : (
               <AiOutlineHeart size={20} color="white" />
            )}
         </button>
         )}
      </div>
  );
}
