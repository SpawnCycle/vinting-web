import "./ProductCard.css";
import FavoriteButton from "../favoriteButton/FavoriteButton";
import type { ProductUI as Product } from "@/types/Product/ProductUI";
import { useAuth } from "@/context/AuthContext";

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
        <p className="product-brand">{product.brand}&nbsp;</p>
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
