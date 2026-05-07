import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CgAdd, CgClose } from "react-icons/cg";

import { createProduct } from "@/api/productsApi";
import { getTags, createTag } from "@/api/tagsApi";
import { useCategories } from "@/hooks/useCategories";

import type { Tag } from "@/types/Product/Tag";

import {
  PRODUCT_CONDITIONS,
  PRODUCT_GENDERS,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
} from "@/types/Product/productEnums";

import "./ProductForm.css";
import { useToast } from "@/context/ToastContext";

export default function Upload() {
  const navigate = useNavigate();
  const { categories } = useCategories();

  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    description: "",
    brand: "",
    categories: [] as string[],
    condition: PRODUCT_CONDITIONS[0],
    gender: PRODUCT_GENDERS[0],
    size: PRODUCT_SIZES[0],
    color: PRODUCT_COLORS[0],
    price: 0,
    stock: 1,
  });

  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getTags().then(setAllTags);
  }, []);

  const update = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (name: string) => {
    const exists = form.categories.includes(name);

    update(
      "categories",
      exists
        ? form.categories.filter((c) => c !== name)
        : [...form.categories, name],
    );
  };

  const addTag = async () => {
    if (!tagInput.trim()) return;

    const existing = allTags.find(
      (t) => t.name.toLowerCase() === tagInput.toLowerCase(),
    );

    let tag: Tag;

    if (existing) tag = existing;
    else {
      tag = await createTag(tagInput);
      setAllTags((p) => [...p, tag]);
    }

    if (!selectedTags.some((t) => t.id === tag.id)) {
      setSelectedTags((p) => [...p, tag]);
    }

    setTagInput("");
  };

  const addImage = (file: File) => {
    setImages((p) => [...p, file]);
    setPreview((p) => [...p, URL.createObjectURL(file)]);
  };

  const removeImage = (i: number) => {
    setImages((p) => p.filter((_, idx) => idx !== i));
    setPreview((p) => p.filter((_, idx) => idx !== i));
  };

  const submit = async () => {
    try {
      await createProduct({
        ...form,
        images,
        tags: selectedTags.map((t) => t.id),
      });
      showToast(
        "Product uploaded successfully",
        "Your product has been added to your listings.",
        "success",
      );
      navigate(-1);
    } catch (error) {
      showToast(
        "Upload failed",
        "Sorry, Something went wrong while uploading your product.",
        "error",
      );
    }
  };

  return (
    <div className="form-container">
      <div className="edit-page">
        <div className="edit-card">
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
          <div className="form-group">
            <label>
              Categories <sup>*</sup>
            </label>
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
              <label>
                Gender <sup>*</sup>
              </label>
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
          <div className="form-row">
            <div className="form-group">
              <label>
                Size <sup>*</sup>
              </label>
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
              <label>
                Condition <sup>*</sup>
              </label>
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
          <div className="form-group">
            <label>
              Colors <sup>*</sup>
            </label>
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
                    className={`color-dot ${
                      c.toLowerCase() === "colorful" ? "colorful" : ""
                    }`}
                    style={
                      c.toLowerCase() !== "colorful"
                        ? { background: c.toLowerCase() }
                        : {}
                    }
                  />
                  {c}
                </div>
              ))}
            </div>
          </div>
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
              <label>Pieces to list</label>
              <input
                type="number"
                min="1"
                max="30"
                onChange={(e) =>
                  update(
                    "stock",
                    e.target.value === "" ? 1 : Number(e.target.value),
                  )
                }
                style={{ background: "var(--bg-color-main)" }}
              />
            </div>
          </div>
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
                  <button onClick={() => removeImage(i)}>×</button>
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
            All fields marked with <sup>*</sup> are required. <br />
            Fields with predefined options have a default value, so please make
            sure to change it to your preferred choice.
          </p>
        </div>
        <div className="edit-actions">
          <button className="secBtn" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="mainBtn" onClick={submit}>
            Upload Product
          </button>
        </div>
      </div>
    </div>
  );
}
