import { useCategories } from "@/hooks/useCategories";

import {
  PRODUCT_GENDERS,
  PRODUCT_SIZES,
  PRODUCT_COLORS,
  PRODUCT_CONDITIONS,
} from "@/types/Product/productEnums";

import type { FiltersState } from "@/types/Search";

import "./FilterPanel.css";

interface Props {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
  close: () => void;
}

export default function FilterPanel({ filters, setFilters, close }: Props) {
  const { categories, loading } = useCategories();

  // egyszerűsített - string alapú
  const toggleMulti = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => {
      const list = prev[key] as string[];

      const updated = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];

      return { ...prev, [key]: updated };
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={close}>×</button>
      </div>

      {/* Gender (single select) */}
      <div className="filter-section">
        <h4>Gender</h4>
        <div className="filter-radio-group">
          {PRODUCT_GENDERS.map((g) => (
            <label key={g}>
              <input
                type="radio"
                checked={filters.gender === g}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    gender: prev.gender === g ? null : g,
                  }))
                }
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="filter-section">
        <h4>Size</h4>
        <div className="size-grid">
          {PRODUCT_SIZES.map((s) => {
            const active = filters.sizes.includes(s);

            return (
              <div
                key={s}
                className={`size-item ${active ? "active" : ""}`}
                onClick={() => toggleMulti("sizes", s)}
              >
                {s}
              </div>
            );
          })}
        </div>
      </div>

      {/* Color */}
      <div className="filter-section">
        <h4>Color</h4>
        <div className="color-list">
          {PRODUCT_COLORS.map((c) => {
            const active = filters.colors.includes(c);

            return (
              <div
                key={c}
                className={`color-item ${active ? "active" : ""}`}
                onClick={() => toggleMulti("colors", c)}
              >
                {c}
              </div>
            );
          })}
        </div>
      </div>

      {/* Category */}
      <div className="filter-section">
        <h4>Category</h4>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="checkbox-group">
            {categories.map((c) => (
              <label key={c.id}>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(c.name)}
                  onChange={() => toggleMulti("categories", c.name)}
                />
                {c.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Condition */}
      <div className="filter-section">
        <h4>Condition</h4>
        <div className="checkbox-group">
          {PRODUCT_CONDITIONS.map((c) => (
            <label key={c}>
              <input
                type="checkbox"
                checked={filters.conditions.includes(c)}
                onChange={() => toggleMulti("conditions", c)}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* Clear */}
      <button
        className="filter-clear"
        onClick={() =>
          setFilters({
            gender: null,
            sizes: [],
            colors: [],
            categories: [],
            conditions: [],
            sort_by: "date",
            asc: false,
          })
        }
      >
        Clear filters
      </button>
    </div>
  );
}
