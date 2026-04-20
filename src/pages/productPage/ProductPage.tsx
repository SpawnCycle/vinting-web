import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  getProductById,
  getProductByUser,
  getProducts,
} from "../../api/productsApi";
import type { ProductUI as Product } from "../../types/Product/ProductUI";
import "./ProductPage.css";

import ImageCarousel from "@/components/imageCarousel/ImageCarousel";
import FavoriteButton from "@/components/favoriteButton/FavoriteButton";
import EditButton from "@/components/editButton/EditButton";
import BackButton from "@/components/backButton/BackButton";
import { CgProfile } from "react-icons/cg";
import DeleteButton from "@/components/deleteButton/DeleteButton";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

type LocationState = {
  returnTo?: string;
  parentReturnTo?: string;
};

export default function ProductPage() {
  const { showToast } = useToast();
  const { user } = useAuth();
  const MY_USER_ID = user?.id;

  const location = useLocation() as { state?: LocationState };
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

  const returnTo = location.state?.returnTo;
  const navigate = useNavigate();

  function handleBuy() {
    if (!product || product.stockAvailable === 0) {
      showToast(
        "Out of stock",
        "This product is currently unavailable.",
        "system",
      );
      return;
    } else {
      navigate(`/order/${product.id}`);
    }
  }

  useEffect(() => {
    async function loadProduct() {
      const foundProduct = await getProductById(productId);

      if (!foundProduct) {
        setProduct(null);
        return;
      }

      setProduct(foundProduct);

      const related = await getProductByUser(foundProduct.sellerId);

      setSellerProducts(
        related?.filter((p) => p.id !== foundProduct.id && p.isAvailable) || [],
      );
    }

    loadProduct();
  }, [productId]);

  if (!product) return null;

  return (
    <div className="product-page">
      <BackButton />

      <div className="product-card">
        <div className="product-image-placeholder">
          <ImageCarousel images={product.images} />
        </div>

        <div className="product-info">
          {product.sellerId === MY_USER_ID ? (
            <div className="action-buttons">
              {product.isAvailable && (
                <EditButton productId={product.id} returnTo={returnTo} />
              )}
              <DeleteButton productId={product.id} />
            </div>
          ) : MY_USER_ID ? (
            product.isAvailable && (
              <FavoriteButton
                productId={product.id}
                initialFavorite={product.isFavorite}
              />
            )
          ) : null}

          <span className="product-brand">{product.brand}</span>

          <h1 className="product-title">{product.title}</h1>

          <div className="product-price">
            {product.price.toLocaleString()} Ft
          </div>

          <div className="product-tags">
            <span className="tag">Size: {product.size}</span>
            <span className="tag">Condition: {product.condition}</span>
            {product.categories?.map((cat) => (
              <span key={cat} className="tag">
                Category: {cat}
              </span>
            ))}
            <span className="tag">Gender: {product.gender}</span>
            <span className="tag">{product.color}</span>
            <span
              className={`tag stock ${product.stockAvailable === 0 ? "out" : ""}`}
            >
              🛒{" "}
              {product.stockAvailable > 0
                ? `${product.stockAvailable} in stock`
                : "Out of stock"}
            </span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="product-tag-list">
              {product.tags.map((tag) => (
                <span key={tag.id} className="product-tag-item">
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          {product.sellerId !== MY_USER_ID && (
            <div className="product-seller">
              <span className="seller-icon">
                <CgProfile />
              </span>

              <button
                className="seller-link"
                onClick={() => {
                  document
                    .getElementById("related-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {product.sellerName}
              </button>
            </div>
          )}

          {product.sellerId === MY_USER_ID ? (
            <div className="product-buy">
              <p className="buy-hint sold-stat">
                {product.stockStarting - product.stockAvailable} sold of{" "}
                {product.stockStarting} pieces
              </p>
            </div>
          ) : (
            product.isAvailable && (
              <div className="product-buy">
                <p className="buy-hint">Interested in this product?</p>
                <button className="buy-button" onClick={handleBuy}>
                  Buy it now
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {sellerProducts.length > 0 && (
        <div className="related-section" id="related-section">
          {product.sellerId !== MY_USER_ID ? (
            <>
              <h2>You may also like</h2>
              <h3>Products from the same user</h3>
            </>
          ) : (
            <h2>Your further listings</h2>
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
