import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProducts } from "../../api/productsApi";
import type { Product } from "../../types/Product";
import "./ProductPage.css";

import ImageCarousel from "@/components/imageCarousel/ImageCarousel";
import FavoriteButton from "@/components/favoriteButton/FavoriteButton";
import EditButton from "@/components/editProduct/EditButton";
import BackButton from "@/components/backButton/BackButton";

type LocationState = {
  returnTo?: string;
  parentReturnTo?: string;
};

const MY_USER_ID = 101;

export default function ProductPage() {
  const location = useLocation() as { state?: LocationState };
  const { id } = useParams<{ id: string }>();

  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

   const returnTo = location.state?.returnTo;
   const parentReturnTo = location.state?.parentReturnTo;


  useEffect(() => {
    async function loadProduct() {
      // adott termék by ID
      const productResult = await getProducts({ id: productId });
      const foundProduct = productResult[0] ?? null;

      if (!foundProduct) {
        setProduct(null);
        return;
      }

      setProduct(foundProduct);

      // eladó további termékei
      const related = await getProducts({
        sellerId: foundProduct.sellerId,
      });

      setSellerProducts(
        related.filter((p) => p.id !== foundProduct.id)
      );
    }

    loadProduct();
  }, [productId]);

  if (!product) return null;

  return (
    <div className="product-page">
      {/* back */}
      <BackButton />

      {/* product card */}
      <div className="product-card">
        {/* image */}
        <div className="product-image-placeholder">
          <ImageCarousel images={product.images} />
        </div>

        {/* info */}
        <div className="product-info">
          {product.sellerId === MY_USER_ID ? (
            product.status === "active" ? (
              <EditButton productId={product.id} returnTo={returnTo} />
            ) : null
          ) : (
            <FavoriteButton
              productId={product.id}
              initialFavorite={product.isFavorite}
            />
          )}

          <span className="product-brand">{product.brand}</span>

          <h1 className="product-title">{product.title}</h1>

          <div className="product-price">
            {product.price.toLocaleString()} Ft
          </div>

          <div className="product-tags">
            <span className="tag">Size: XX</span>
            <span className="tag">Condition: {product.condition}</span>
            <span className="tag">Color: {product.color}</span>
            <span className="tag">Category: {product.category}</span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {/* other products by seller */}
      {sellerProducts.length > 0 && (
        <div className="related-section">
          {product.sellerId !== MY_USER_ID ? (
            <>
              <h2>You may also like</h2>
              <h3>Products from the same user</h3>
            </>
          ) : (
            <>
              <h2>Your other listings</h2>
            </>
          )}

          <div className="related-grid">
            {sellerProducts.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                state={{ returnTo }}
                className="related-card"
              >
                <div className="related-image-placeholder">
                  <img src={p.images[0]} alt={p.title} />
                </div>
                <div className="related-title">{p.title}</div>
                <div className="related-price">
                  {p.price.toLocaleString()} Ft
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}