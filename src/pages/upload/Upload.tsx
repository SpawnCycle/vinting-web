import { createProduct } from "@/api/productsApi";
import ProductForm from "@/components/productForm/ProductForm";
import type { Product } from "@/types/Product";

export default function Upload() {
  return (
    <div className="form-container">
      <ProductForm
        title="Upload a new product"
        submitLabel="Upload product"
        onSubmit={async (data) => {
          await createProduct(data as Product);
        }}
      />
    </div>
  );
}
