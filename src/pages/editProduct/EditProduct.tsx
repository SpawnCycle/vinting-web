import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

import { getProducts, updateProduct } from "@/api/productsApi";
import {
  type Product,
  type ProductCategory,
  type ProductStatus,
  type ProductCondition,
  type ProductGender,
  type ProductSize,
  PRODUCT_CATEGORIES,
  PRODUCT_CONDITIONS,
  PRODUCT_GENDERS,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  PRODUCT_STATUSES,
} from "@/types/Product";

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
        {/* titlr */}
        <div className="form-group">
          <label>Title</label>
          <input
            value={form.title ?? ""}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>

        {/* description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows={4}
            value={form.description ?? ""}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        {/* brand */}
        <div className="form-group">
          <label>Brand</label>
          <input
            value={form.brand ?? ""}
            onChange={(e) => updateField("brand", e.target.value)}
          />
        </div>

        {/* category */}
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
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* condition */}
        <div className="form-group">
          <label>Condition</label>
          <select
            value={form.condition ?? ""}
            onChange={(e) =>
              updateField("condition", e.target.value as ProductCondition)
            }
          >
            <option value="" disabled>
              Select condition
            </option>
            {PRODUCT_CONDITIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* gender */}
        <div className="form-group">
          <label>Gender</label>
          <select
            value={form.gender ?? ""}
            onChange={(e) =>
              updateField("gender", e.target.value as ProductGender)
            }
          >
            <option value="" disabled>
              Select gender
            </option>
            {PRODUCT_GENDERS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* size */}
        <div className="form-group">
          <label>Size</label>
          <select
            value={form.size ?? ""}
            onChange={(e) => updateField("size", e.target.value as ProductSize)}
          >
            <option value="" disabled>
              Select size
            </option>
            {PRODUCT_SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* colors */}
        <div className="form-group">
          <label>Colors</label>
          <div className="color-grid">
            {PRODUCT_COLORS.map((color) => {
              const selected = form.colors?.includes(color) ?? false;

              return (
                <label key={color} className="color-item">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => {
                      const prev = form.colors ?? [];
                      updateField(
                        "colors",
                        e.target.checked
                          ? [...prev, color]
                          : prev.filter((c) => c !== color),
                      );
                    }}
                  />
                  {color}
                </label>
              );
            })}
          </div>
        </div>

        {/* price & status */}
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={form.price ?? ""}
              onChange={(e) => updateField("price", Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={form.status ?? ""}
              onChange={(e) =>
                updateField("status", e.target.value as ProductStatus)
              }
            >
              {PRODUCT_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
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
