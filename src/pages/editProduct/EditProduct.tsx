import { getProducts, updateProduct } from "@/api/productsApi";
import ProductForm from "@/components/productForm/ProductForm";
import type { Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      const res = await getProducts({ id: productId });
      setProduct(res[0]);
    }

    load();
  }, [productId]);

  if (!product) return null;

  return (
    <div className="form-container">
      <ProductForm
        title="Edit product"
        submitLabel="Save changes"
        initialProduct={product}
        onSubmit={async (data) => {
          await updateProduct(productId, data);
        }}
      />
    </div>
  );
}
