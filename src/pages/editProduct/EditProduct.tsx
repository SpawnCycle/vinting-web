import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CgAdd, CgClose } from "react-icons/cg";

import { updateProduct } from "@/api/productsApi";
import { uploadImage } from "@/api/imagesApi";
import { getTags, createTag } from "@/api/tagsApi";
import { useCategories } from "@/hooks/useCategories";

import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";

import type { Tag } from "@/types/Product/Tag";
import type { ProductDto } from "@/types/Product/ProductDto";
import type { UpdateProductDto } from "@/types/Product/UpdateProductDto";

import { mapProductToEdit } from "@/types/Product/ProductMapperToEdit";

import {
  PRODUCT_CONDITIONS,
  PRODUCT_GENDERS,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
} from "@/types/Product/productEnums";

import "./ProductForm.css";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { user } = useAuth();
  const { showToast } = useToast();
  const { categories } = useCategories();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<any>(null);
  const [originalStock, setOriginalStock] = useState<number>(0);

  const [existingImages, setExistingImages] = useState<
    { id: number; url: string }[]
  >([]);

  const [newImages, setNewImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState("");

  // LOAD
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/products/${productId}`);
      if (!res.ok) return;

      const dto: ProductDto = await res.json();

      if (!user || dto.user.id !== user.id) {
        showToast(
          "Access denied",
          "You cannot edit other users' products.",
          "error",
        );
        navigate("/");
        return;
      }

      const p = mapProductToEdit(dto);

      setForm({
        title: p.title,
        description: p.description,
        brand: p.brand,
        categories: p.categories.map((c) => c.name),
        condition: p.condition,
        gender: p.gender,
        size: p.size,
        color: p.color,
        price: p.price,
        hasStock: p.has_stock,
        stockAvailable: p.stock_available,
      });
      setOriginalStock(p.stock_available);

      setExistingImages(p.images);
      setPreview(p.images.map((i) => i.url));
      setSelectedTags(p.tags);
    }

    load();
    getTags().then(setAllTags);
  }, [productId, user]);

  if (!form) return null;

  const update = (key: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  // CATEGORY
  const toggleCategory = (name: string) => {
    const exists = form.categories.includes(name);

    update(
      "categories",
      exists
        ? form.categories.filter((c: string) => c !== name)
        : [...form.categories, name],
    );
  };

  // TAG
  const addTag = async () => {
    if (!tagInput.trim()) return;

    const existing = allTags.find(
      (t) => t.name.toLowerCase() === tagInput.toLowerCase(),
    );

    let tag = existing ?? (await createTag(tagInput));

    if (!existing) setAllTags((p) => [...p, tag]);

    if (!selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags((p) => [...p, tag]);
    }

    setTagInput("");
  };

  // IMAGE
  const addImage = (file: File) => {
    setNewImages((p) => [...p, file]);
    setPreview((p) => [...p, URL.createObjectURL(file)]);
  };

  const removeImage = (index: number) => {
    setPreview((p) => p.filter((_, i) => i !== index));

    if (index < existingImages.length) {
      setExistingImages((p) => p.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setNewImages((p) => p.filter((_, i) => i !== newIndex));
    }
  };

  // SUBMIT
  const submit = async () => {
    try {
      const uploadedIds: number[] = [];

      for (const file of newImages) {
        const id = await uploadImage(file);
        uploadedIds.push(id);
      }

      const categoryIds = form.categories
        .map((name: string) => categories.find((c) => c.name === name)?.id)
        .filter(Boolean);

      const dto: UpdateProductDto = {
        id: productId,
        name: form.title,
        description: form.description,
        price: form.price,
        size: form.size,
        brand: form.brand || null,
        condition: form.condition,
        sex: form.gender,
        categories: categoryIds,
        tags: selectedTags.map((t) => t.id),
        images: [...existingImages.map((img) => img.id), ...uploadedIds],
        has_stock: form.hasStock,
        color: form.color,

        stock_available: form.stockAvailable,
        stock: form.stockAvailable,
      };

      await updateProduct(dto);

      showToast(
        "Product updated successfully",
        "Your changes have been saved.",
        "success",
      );

      navigate(-1);
    } catch (err) {
      showToast("Update failed", "Something went wrong.", "error");
    }
  };

  return (
    <div className="form-container">
      <div className="edit-page">
        <div className="edit-card">
          {/* TITLE */}
          <div className="form-group">
            <label>
              Title <sup>*</sup>
            </label>
            <input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              style={{ background: "var(--bg-color-main)" }}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label>
              Description <sup>*</sup>
            </label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          {/* TAGS */}
          <div className="form-group">
            <label>Tags</label>

            <div className="tag-row">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                style={{ background: "var(--bg-color-main)" }}
              />
              <button onClick={addTag}>Add</button>
            </div>

            <div className="tag-list">
              {selectedTags.map((tag) => (
                <span key={tag.id} className="tag-chip">
                  {tag.name}
                  <CgClose
                    onClick={() =>
                      setSelectedTags((p) => p.filter((t) => t.id !== tag.id))
                    }
                  />
                </span>
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="form-group">
            <label>Categories</label>

            <div className="category-grid">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className={`category-option ${
                    form.categories.includes(c.name) ? "selected" : ""
                  }`}
                  onClick={() => toggleCategory(c.name)}
                >
                  {c.name}
                </div>
              ))}
            </div>
          </div>

          {/* BRAND & GENDER */}
          <div className="form-row">
            <div className="form-group">
              <label>Brand</label>
              <input
                value={form.brand}
                onChange={(e) => update("brand", e.target.value)}
                style={{ background: "var(--bg-color-main)" }}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                value={form.gender}
                onChange={(e) => update("gender", e.target.value)}
              >
                {PRODUCT_GENDERS.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SIZE & CONDITION */}
          <div className="form-row">
            <div className="form-group">
              <label>Size</label>
              <select
                value={form.size}
                onChange={(e) => update("size", e.target.value)}
              >
                {PRODUCT_SIZES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Condition</label>
              <select
                value={form.condition}
                onChange={(e) => update("condition", e.target.value)}
              >
                {PRODUCT_CONDITIONS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* COLORS */}
          <div className="form-group">
            <label>Colors</label>

            <div className="color-dropdown">
              {PRODUCT_COLORS.map((c) => (
                <div
                  key={c}
                  className={`color-option ${
                    form.color === c ? "selected" : ""
                  }`}
                  onClick={() => update("color", c)}
                >
                  <div
                    className="color-dot"
                    style={{ background: c.toLowerCase() }}
                  />
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* PRICE & STOCK */}
          <div className="form-row">
            <div className="form-group">
              <label>
                Price <sup>*</sup>
              </label>
              <input
                type="number"
                value={form.price === 0 ? "" : form.price}
                onChange={(e) =>
                  update(
                    "price",
                    e.target.value === "" ? 0 : Number(e.target.value),
                  )
                }
                style={{ background: "var(--bg-color-main)" }}
              />
            </div>
            <div className="form-group">
              <label>
                Pieces Available <sup>*</sup>
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={form.stockAvailable === 0 ? "" : form.stockAvailable}
                onChange={(e) =>
                  update(
                    "stockAvailable",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                onBlur={(e) => {
                  const newStock = Number(e.target.value);
                  if (!e.target.value || newStock < originalStock) {
                    showToast(
                      "Cannot reduce stock",
                      "You can only increase the number of available pieces, not decrease it.",
                      "error",
                    );
                    update("stockAvailable", originalStock);
                  }
                }}
                style={{ background: "var(--bg-color-main)" }}
              />
            </div>
          </div>

          {/* IMAGES */}
          <div className="form-group">
            <label>
              Images <sup>*</sup>
            </label>

            <p className="note">
              (You can only upload PNG images no larger than 2MB)
            </p>

            <div className="image-scroll">
              {preview.map((img, i) => (
                <div className="image-thumb" key={i}>
                  <img src={img} />
                  <button onClick={() => removeImage(i)}>
                    <CgClose />
                  </button>
                </div>
              ))}

              <div
                className="image-add"
                onClick={() => fileInputRef.current?.click()}
              >
                <CgAdd />
              </div>

              <input
                type="file"
                hidden
                ref={fileInputRef}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) addImage(f);
                }}
              />
            </div>
          </div>

          <p className="note">
            Please make sure all required fields (marked with <sup>*</sup>) are
            filled in. <br />
            Do not leave any manually entered fields empty while editing.
          </p>
        </div>

        <div className="edit-actions">
          <button className="secBtn" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="mainBtn" onClick={submit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
