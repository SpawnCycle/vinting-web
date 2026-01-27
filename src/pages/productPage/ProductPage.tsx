import { CgArrowLeft } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProducts } from "../../api/productsApi";
import type { Product } from "../../types/Product";

export default function ProductPage() {
   const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();

   const productId = Number(id);

   const [product, setProduct] = useState<Product | null>(null);

   const navigateBack = () => {
      if (window.history.length > 1) {
         navigate(-1);
      } else {
         navigate("/");
      }
   };

   useEffect(() => {
      async function loadProduct() {
         const products = await getProducts();
         const found = products.find(p => p.id === productId);
         
         setProduct(found ?? null);
      }
      loadProduct();
   }, [productId]);
   
   if (!product) return null;

   return (
      <div>
         <button onClick={navigateBack}>
            <CgArrowLeft />
         </button>

         <h1>{product.title}</h1>
      </div>
   );
}