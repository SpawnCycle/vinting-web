import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProductGrid from "../../components/productGrid/ProductGrid";
import BackButton from "@/components/backButton/BackButton";
import { getProducts } from "../../api/productsApi";
import type { Product, ProductStatus } from "../../types/Product";

import "./MyListings.css";
import { useAuth } from "@/context/AuthContext";

export default function MyListings() {
  const { user } = useAuth();
  const MY_USER_ID = user?.id;

  const [products, setProducts] = useState<Product[]>([]);
  const [filterStatus, setFilterStatus] = useState<ProductStatus>("Active");
  const [loading, setLoading] = useState(true);
  //const location = useLocation();
  const location = useLocation();
  const returnTo = location.state?.returnTo;

  useEffect(() => {
    async function loadMyListings() {
      const data = await getProducts({ sellerId: MY_USER_ID });
      setProducts(data);
      setLoading(false);
    }

    loadMyListings();
  }, []);

  const myProducts = products.filter((p) => p.status === filterStatus);

  //biztos ami tuti
  if (loading) {
    return <p>Betöltés...</p>;
  }

  return (
    <div>
      <div className="header-div">
        <BackButton />
        <h1>My Listings</h1>
      </div>

      <div className="status-buttons">
        <button
          style={{
            backgroundColor:
              filterStatus === "Active"
                ? "var(--button-bg-main)"
                : "var(--button-bg-secondary)",
            color:
              filterStatus === "Active"
                ? "var(--button-text-main)"
                : "var(--button-text-secondary)",
          }}
          onClick={() => setFilterStatus("Active")}
        >
          Active
        </button>

        <button
          style={{
            backgroundColor:
              filterStatus === "Sold"
                ? "var(--button-bg-main)"
                : "var(--button-bg-secondary)",
            color:
              filterStatus === "Sold"
                ? "var(--button-text-main)"
                : "var(--button-text-secondary)",
          }}
          onClick={() => setFilterStatus("Sold")}
        >
          Sold
        </button>
      </div>

      <div style={{ padding: "30px" }}>
        <ProductGrid
          products={myProducts}
          showFavoriteButton={false}
          returnTo="/profile/my-listings" //{returnTo ?? "/profile"}
          parentReturnTo={location.state?.returnTo}
        />
      </div>
    </div>
  );
}
