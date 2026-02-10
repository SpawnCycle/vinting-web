import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

import { getProducts, updateProduct } from "@/api/productsApi";
import type { Product, ProductCategory, ProductStatus } from "@/types/Product";

import "./EditProduct.css";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      if (!productId) return;

      const res = await getProducts({ id: productId });
      const found = res[0];
      if (!found) return;

      setProduct(found);
      setForm(found);
    }

    load();
  }, [productId]);

  const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    try {
      setSaving(true);
      await updateProduct(productId, form);
      navigate(-1);
    } finally {
      setSaving(false);
    }
  };

  if (!product) return null;

  return (
    <div className="edit-page">
      <header className="edit-header">
        <h2>Edit product</h2>
        <button className="close-button" onClick={() => navigate(-1)}>
          <CgClose />
        </button>
      </header>

      <div className="edit-card">
        <div className="form-group">
          <label>Title</label>
          <input
            value={form.title ?? ""}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows={4}
            value={form.description ?? ""}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Brand</label>
            <input
              value={form.brand ?? ""}
              onChange={(e) => updateField("brand", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              value={form.color ?? ""}
              onChange={(e) => updateField("color", e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={form.category ?? ""}
              onChange={(e) =>
                updateField("category", e.target.value as ProductCategory)
              }
            >
              <option value="" disabled>
                Select category
              </option>
              {[
                "Kabát",
                "Pulóver",
                "Nadrág",
                "Póló",
                "Cipő",
                "Kiegészítő",
                "Ing",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Condition</label>
            <select
              value={form.condition ?? ""}
              onChange={(e) => updateField("condition", e.target.value)}
            >
              <option value="" disabled>
                Select condition
              </option>
              {["Új", "Újszerű", "Használt"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (Ft)</label>
            <input
              type="number"
              value={form.price ?? ""}
              onChange={(e) => updateField("price", Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={form.status ?? "active"}
              onChange={(e) =>
                updateField("status", e.target.value as ProductStatus)
              }
            >
              <option value="active">Active</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>
      </div>

      <div className="edit-actions">
        <button className="btn-secondary" onClick={() => navigate(-1)}>
          Cancel
        </button>

        <button className="btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}
