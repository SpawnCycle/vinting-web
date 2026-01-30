import { useEffect, useState } from "react";
import ProductGrid from "../../components/productGrid/ProductGrid";
import { getProducts } from "../../api/productsApi";
import type { Product } from "../../types/Product";

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
         <h1>Főoldal</h1>
         <ProductGrid products={products} />
      </div>
  );
}