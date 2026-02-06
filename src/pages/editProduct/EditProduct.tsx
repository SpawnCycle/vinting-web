import { /*useLocation, */ useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProducts, updateProduct } from "../../api/productsApi";
import type { Product } from "../../types/Product";

//import BackButton from "@/components/backButton/BackButton";

import "./EditProduct.css";
import { CgClose } from "react-icons/cg";

export default function EditProductPage() {
    const navigate = useNavigate();
  
  const { id } = useParams<{ id: string }>();

  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});

  useEffect(() => {
    async function load() {
      const res = await getProducts({ id: productId });
      const found = res[0];
      if (!found) return;

      setProduct(found);
      setForm(found);
    }

    load();
  }, [productId]);

    const save = async () => {
    await updateProduct(productId, form);

    navigate(-1);
  };


  if (!product) return null;

  return (
    <div className="edit-page">
      <header className="edit-header">
        

        <button onClick={() => navigate(-1)} >
            <CgClose />
        </button>
        <h1>Edit ...</h1>
        <button className="save-btn" onClick={save}>
          Save
        </button>
      </header>

      <div className="edit-content">
        <label>
          Title
          <input
            value={form.title ?? ""}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />
        </label>
      </div>
    </div>
  );
}
