import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CgAdd, CgClose } from "react-icons/cg";

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

import "./ProductForm.css";

type ProductFormProps = {
  initialProduct?: Product;
  title: string;
  submitLabel: string;
  onSubmit: (data: Partial<Product>) => Promise<void>;
};

export default function ProductForm({
  initialProduct,
  title,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState<Partial<Product>>(initialProduct ?? {});
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialProduct) {
      setForm(initialProduct);
    }
  }, [initialProduct]);

  const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    try {
      setSaving(true);
      await onSubmit(form);
      navigate(-1);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-page">
      <header className="edit-header">
        <h2>{title}</h2>

        {location.pathname !== "/upload" ? (
          <button className="close-button" onClick={() => navigate(-1)}>
            <CgClose />
          </button>
        ) : null}
      </header>

      <div className="edit-card">
        {/* title */}
        <div className="form-group">
          <label>Title</label>
          <input
            value={form.title ?? ""}
            onChange={(e) => updateField("title", e.target.value)}
            style={{
              backgroundColor: "var(--bg-color-main)",
              border: "1px solid var(--bg-color-secondary)",
            }}
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
            style={{
              backgroundColor: "var(--bg-color-main)",
              border: "1px solid var(--bg-color-secondary)",
            }}
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

          <div className="color-dropdown">
            {PRODUCT_COLORS.map((color) => {
              const selected = form.colors?.includes(color) ?? false;

              return (
                <label
                  key={color}
                  className={`color-option ${selected ? "selected" : ""}`}
                >
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

                  <span
                    className="color-dot"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />

                  {color}
                </label>
              );
            })}
          </div>
        </div>

        {/* price + status */}
        <div className="form-row">
          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              value={form.price ?? ""}
              onChange={(e) => updateField("price", Number(e.target.value))}
              style={{
                backgroundColor: "var(--bg-color-main)",
                border: "1px solid var(--bg-color-secondary)",
              }}
            />
          </div>

          {location.pathname !== "/upload" ? (
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
          ) : null}
        </div>

        {/* images */}
        <div className="form-group">
          <label>Images</label>

          <div className="image-scroll">
            {form.images?.map((img, index) => (
              <div key={img + index} className="image-thumb">
                <img src={img} alt="product" />

                <button
                  type="button"
                  className="image-remove"
                  onClick={() =>
                    updateField(
                      "images",
                      form.images!.filter((_, i) => i !== index),
                    )
                  }
                >
                  <CgClose />
                </button>
              </div>
            ))}

            <div
              className="image-add"
              onClick={() => fileInputRef.current?.click()}
            >
              <CgAdd size={28} />
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) => {
              if (!e.target.files) return;

              const file = e.target.files[0];

              const previewUrl = URL.createObjectURL(file);

              updateField("images", [...(form.images ?? []), previewUrl]);

              e.target.value = "";
            }}
          />
        </div>
      </div>

      <div className="edit-actions">
        <button className="btn-secondary" onClick={() => navigate(-1)}>
          Cancel
        </button>

        <button className="btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </div>
  );
}
