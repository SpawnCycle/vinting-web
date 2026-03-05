import { useEffect, useState } from "react";
import ProductGrid from "../../components/productGrid/ProductGrid";
import { getProducts } from "../../api/productsApi";
import type { Product } from "../../types/Product";
import CategoryCard from "@/components/categoryCard/CategoryCrad";
import { categories } from "@/components/categoryCard/Categories";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }

    loadProducts();
  }, []);

  //bizti
  if (loading) {
    return <p>Betöltés...</p>;
  }

  return (
    <div>
      <h1>Home page</h1>
      <h3>All products...</h3>
      <div className="categories-row">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.title}
            path={cat.path}
            title={cat.title}
            image={cat.image}
          />
        ))}
      </div>
      {/* <ProductGrid products={products} returnTo="/" /> */}
    </div>
  );
}
