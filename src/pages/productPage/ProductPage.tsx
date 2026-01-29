import { CgArrowLeft } from "react-icons/cg";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProducts } from "../../api/productsApi";
import type { Product } from "../../types/Product";
import "./ProductPage.css";

export default function ProductPage() {
   const navigate = useNavigate();
   const { id } = useParams<{ id: string }>();

   const productId = Number(id);

   const [product, setProduct] = useState<Product | null>(null);
   const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

   const navigateBack = () => {
      if (window.history.length > 1) {
         navigate(-1);
      } else {
         navigate("/");
      }
   };

   useEffect(() => {
      async function loadProduct() {
      
         // adott termék by ID
         const productResult = await getProducts({ id: productId });
         const foundProduct = productResult[0] ?? null;

         if (!foundProduct) { setProduct(null); return; }

         setProduct(foundProduct);

         // eladó további termékei
         const related = await getProducts({
            sellerId: foundProduct.sellerId,
         });

         setSellerProducts( related.filter(p => p.id !== foundProduct.id) );
      }

      loadProduct();
   }, [productId]);

   if (!product) return null;

   return (
      <div className="product-page">

         {/* bac */}
         <button className="back-button" onClick={navigateBack}>
            <CgArrowLeft size={22} />
         </button>

         {/* product card */}
         <div className="product-card">
            {/* image */}
            <div className="product-image-placeholder" />

            {/* info */}
            <div className="product-info">
               <span className="product-brand">{product.brand}</span>

               <h1 className="product-title">{product.title}</h1>

               <div className="product-price">
                  {product.price.toLocaleString()} Ft
               </div>

               <div className="product-tags">
                  <span className="tag">Sitze: XX</span>
                  <span className="tag">Condition: {product.condition}</span>
                  <span className="tag">Color: {product.color}</span>
                  <span className="tag">Category: {product.category}</span>
                  {/*<span className="tag">{product.gender}</span>*/}
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
               <h2>You may also like</h2>
               <h3>Products from the same user</h3>

               <div className="related-grid">
                  {sellerProducts.map(p => (
                  <Link
                     key={p.id}
                     to={`/product/${p.id}`}
                     className="related-card"
                  >
                     <div className="related-image-placeholder">
                        <img src={p.images[0]} alt="" />
                     </div>
                     <div className="related-title">{p.title}</div>
                     <div className="related-price">{p.price.toLocaleString()} Ft</div>
                  </Link>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}