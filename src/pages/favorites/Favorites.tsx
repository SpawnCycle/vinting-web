import { useEffect, useState } from "react";
import ProductGrid from "@/components/productGrid/ProductGrid";
/* import BackButton from "@/components/backButton/BackButton";*/
import { getProducts } from "@/api/productsApi";
import type { Product } from "@/types/Product";
import "./Favorites.css";

type FilterType = "all" | "clothing" | "shoes" | "accessories";

export default function FavoritesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  useEffect(() => {
    async function loadFavorites() {
      const allProducts = await getProducts();

      let favorites = allProducts.filter((p) => p.isFavorite);

      if (activeFilter === "shoes") {
        favorites = favorites.filter((p) => p.category === "Shoes");
      }

      if (activeFilter === "accessories") {
        favorites = favorites.filter((p) => p.category === "Accessory");
      }

      if (activeFilter === "clothing") {
        favorites = favorites.filter(
          (p) => p.category !== "Shoes" && p.category !== "Accessory",
        );
      }

      setProducts(favorites);
    }

    loadFavorites();
  }, [activeFilter]);

  return (
    <div className="favorites-page">
      {/* header */}
      <div className="favorites-header">
        <h1>Favorites</h1>
      </div>

      {/* filter bar */}
      <div className="favorites-filters-container">
        <div className="favorites-filters">
          <button
            className={activeFilter === "all" ? "active" : ""}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>

          <button
            className={activeFilter === "clothing" ? "active" : ""}
            onClick={() => setActiveFilter("clothing")}
          >
            Clothing
          </button>

          <button
            className={activeFilter === "shoes" ? "active" : ""}
            onClick={() => setActiveFilter("shoes")}
          >
            Shoes
          </button>

          <button
            className={activeFilter === "accessories" ? "active" : ""}
            onClick={() => setActiveFilter("accessories")}
          >
            Accessories
          </button>
        </div>
      </div>

      {/* grid */}
      {products.length === 0 ? (
        <div className="favorites-empty">
          <h2>Nothing saved yet</h2>
          <p>Start exploring and save items you love.</p>
        </div>
      ) : (
        <ProductGrid
          products={products}
          showFavoriteButton={true}
          returnTo="/favorites"
        />
      )}
    </div>
  );
}
