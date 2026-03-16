import "./ProductCard.css";
import FavoriteButton from "../favoriteButton/FavoriteButton";
import type { Product } from "../../types/Product";
import { useAuth } from "@/context/AuthContext";
import { use } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();

  const formatPrice = (value: number): string =>
    new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.images[0]} alt={product.title} />
      </div>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h2>{product.title}</h2>
        <div className="product-extra">
          <p className="product-condition">{product.condition}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
      </div>

      {user?.id !== product.sellerId ? (
        <FavoriteButton
          productId={product.id}
          initialFavorite={product.isFavorite} //backend boolean
        />
      ) : null}
    </div>
  );
}
