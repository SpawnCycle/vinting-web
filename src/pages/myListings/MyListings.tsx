import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ProductGrid from "../../components/productGrid/ProductGrid";
import BackButton from "@/components/backButton/BackButton";
import type { ProductUI as Product } from "../../types/Product/ProductUI";

import "./MyListings.css";
import { useAuth } from "@/context/AuthContext";
import { getProductByUser } from "@/api/productsApi";

export default function MyListings() {
  const { user } = useAuth();
  const MY_USER_ID = user?.id;

  const [products, setProducts] = useState<Product[]>([]);
  const [filterStatus, setFilterStatus] = useState<boolean>(() => {
    const saved = localStorage.getItem("my-listings-filter");
    return saved === "false" ? false : true;
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const returnTo = location.state?.returnTo;

  const navigate = useNavigate();

  useEffect(() => {
    async function loadMyListings() {
      if (!MY_USER_ID) return;
      const data = await getProductByUser(MY_USER_ID);
      setProducts(data?.filter((p) => p.isAvailable) || []);
      setLoading(false);
    }

    loadMyListings();
  }, []);

  const myProducts = products.filter((p) => {
    if (filterStatus === true) {
      // Aktív: isAvailable true - akár részben eladott, akár teljes készlet
      return p.isAvailable === true;
    } else {
      // Eladott: isAvailable false vagy részben már elkelt
      return p.isAvailable === false || p.stockStarting > p.stockAvailable;
    }
  });

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
              filterStatus === true
                ? "var(--button-bg-main)"
                : "var(--button-bg-secondary)",
            color:
              filterStatus === true
                ? "var(--button-text-main)"
                : "var(--button-text-secondary)",
          }}
          onClick={() => {
            setFilterStatus(true);
            localStorage.setItem("my-listings-filter", "true");
          }}
        >
          Active
        </button>

        <button
          style={{
            backgroundColor:
              filterStatus === false
                ? "var(--button-bg-main)"
                : "var(--button-bg-secondary)",
            color:
              filterStatus === false
                ? "var(--button-text-main)"
                : "var(--button-text-secondary)",
          }}
          onClick={() => {
            setFilterStatus(false);
            localStorage.setItem("my-listings-filter", "false");
          }}
        >
          Sold
        </button>
      </div>

      <div className="prod-cont">
        {myProducts.length === 0 ? (
          <>
            {filterStatus === false ? (
              <p className="DontHave">You haven’t sold anything yet.</p>
            ) : (
              <p className="DontHave">You don’t have any active listings.</p>
            )}
            <button
              className="upload-button"
              onClick={() => {
                navigate("/upload");
              }}
            >
              Upload a product
            </button>
          </>
        ) : (
          <ProductGrid
            products={myProducts}
            returnTo="/profile/my-listings"
            parentReturnTo={location.state?.returnTo}
          />
        )}
      </div>
    </div>
  );
}
