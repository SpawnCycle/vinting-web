import { useEffect, useState } from "react";
import ProductGrid from "../../components/productGrid/ProductGrid";
import CategoryCard from "@/components/categoryCard/CategoryCrad";
import { categories } from "../../components/categoryCard/Categories";
import type { Product } from "../../types/Product";
import { getProducts } from "../../api/productsApi";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const { showToast } = useToast();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="home">
      {/* hero */}
      <section className="home-hero">
        <div className="hero-text">
          {/* <h1>Welcome back, User{}</h1>  UserName!!! */}
          <h2>
            Explore fashion.
            <br />
            Resell effortlessly.
          </h2>
          <p>
            Buy and sell pre-loved fashion pieces effortlessly in a modern
            marketplace.
          </p>
          <div className="hero-search">
            <input
              placeholder="Search for clothes..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/search?q=${query}`);
                }
              }}
            />
          </div>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate(`/search?q=${query}`)}
            >
              Browse items
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/upload")}
            >
              Upload item
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img src="" alt="" />
        </div>
      </section>

      {/* categories */}

      <section className="home-categories">
        <h2>Popular categories</h2>

        <div className="categories-row">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              title={cat.title}
              path={cat.path}
              image={cat.image}
            />
          ))}
        </div>
      </section>

      {/* most liked ones */}

      <section className="home-trending">
        <h2>Trending now</h2>

        <ProductGrid products={products.slice(0, 30)} returnTo={"/"} />
      </section>
    </div>
  );
}
