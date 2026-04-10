import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import ProductGrid from "../../components/productGrid/ProductGrid";
import FilterPanel from "./FilterPanel";
import "./SearchPage.css";

import type { ProductUI } from "../../types/Product/ProductUI";
import type { FiltersState } from "../../types/Search";
import { getProducts } from "../../api/productsApi";

// Only in use in the ordering dropdown (see `select.sort-select`)
type SortByType = "date_asc" | "date_desc" | "price_asc" | "price_desc";

const defaultFilters: FiltersState = {
  gender: null,
  sizes: [],
  colors: [],
  categories: [],
  conditions: [],
  sort_by: "date",
  asc: false,
};

export default function SearchPage() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL » STATE
  const parseFiltersFromURL = (): FiltersState => {
    let asc_str = searchParams.get("asc");
    let asc = asc_str !== null && asc_str === "true";
    return {
      gender: searchParams.get("gender") || null,
      sizes: searchParams.getAll("size"),
      colors: searchParams.getAll("color"),
      categories: searchParams.getAll("category"),
      conditions: searchParams.getAll("condition"),
      sort_by:
        (searchParams.get("sort_by") as FiltersState["sort_by"]) || "date",
      asc,
    };
  };

  const [filters, setFilters] = useState<FiltersState>(parseFiltersFromURL());
  const [selectedSortBy, setSelectedSortBy] = useState<SortByType>("date_desc");

  const [queryInput, setQueryInput] = useState(searchParams.get("q") ?? "");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const [products, setProducts] = useState<ProductUI[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // STATE » URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.gender) params.set("gender", filters.gender);

    filters.sizes.forEach((s) => params.append("size", s));
    filters.colors.forEach((c) => params.append("color", c));
    filters.categories.forEach((c) => params.append("category", c));
    filters.conditions.forEach((c) => params.append("condition", c));
    params.set("sort_by", filters.sort_by);
    params.set("asc", filters.asc.toString());

    if (query) {
      params.set("q", query);
    }

    setSearchParams(params, { replace: true });
  }, [filters, query, setSearchParams]);

  // fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const apiFilters = {
          search: query || undefined,
          gender: filters.gender || undefined,
          color: filters.colors.length ? filters.colors : undefined,
          size: filters.sizes[0] || undefined,
          categories: filters.categories.length
            ? filters.categories
            : undefined,
          condition: filters.conditions.length ? filters.conditions : undefined,
          sort_by: filters.sort_by,
          asc: filters.asc,
        };

        const data = await getProducts(apiFilters);

        let processed = data;

        // condition (frontend filter)
        if (filters.conditions.length > 0) {
          processed = processed.filter((p) =>
            filters.conditions.includes(p.condition),
          );
        }

        setProducts(processed);
      } catch (err) {
        console.error("Fetch failed:", err);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [filters, query]);

  // tag remove
  const removeTag = (type: keyof FiltersState, value?: string) => {
    if (type === "gender") {
      setFilters((prev) => ({
        ...prev,
        gender: null,
      }));
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [type]: (prev[type] as string[]).filter((v) => v !== value),
    }));
  };

  const clearAll = () => {
    setFilters(defaultFilters);
    setQuery("");
    setQueryInput("");
  };

  // selected tags
  const selectedTags = useMemo(() => {
    const tags: {
      label: string;
      type: keyof FiltersState;
      value?: string;
    }[] = [];

    if (filters.gender) {
      tags.push({
        label: filters.gender,
        type: "gender",
      });
    }

    filters.sizes.forEach((s) =>
      tags.push({ label: s, type: "sizes", value: s }),
    );

    filters.colors.forEach((c) =>
      tags.push({ label: c, type: "colors", value: c }),
    );

    filters.categories.forEach((c) =>
      tags.push({
        label: c,
        type: "categories",
        value: c,
      }),
    );

    filters.conditions.forEach((c) =>
      tags.push({
        label: c,
        type: "conditions",
        value: c,
      }),
    );

    return tags;
  }, [filters]);

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="search-bar-row">
          <input
            className="search-input"
            placeholder="Search for brands, products..."
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setQuery(queryInput);
                (e.target as HTMLInputElement).blur();
              }
            }}
          />

          <button
            className="filter-btn mobile-only"
            onClick={() => setIsFilterOpen(true)}
          >
            Filters
          </button>

          {/* sort */}
          <select
            className="sort-select"
            value={selectedSortBy}
            onChange={(e) => {
              setSelectedSortBy(e.target.value as SortByType);
              setFilters((prev) => {
                let sort_type = e.target.value as SortByType;
                let sort = "date" as FiltersState["sort_by"];
                let asc = false;
                switch (sort_type) {
                  default:
                  case "date_desc":
                    {
                      sort = "date";
                      asc = false;
                    }
                    break;
                  case "date_asc":
                    {
                      sort = "date";
                      asc = true;
                    }
                    break;
                  case "price_asc":
                    {
                      sort = "price";
                      asc = true;
                    }
                    break;
                  case "price_desc":
                    {
                      sort = "price";
                      asc = false;
                    }
                    break;
                }
                return {
                  ...prev,
                  sort_by: sort,
                  asc,
                };
              });
            }}
          >
            <option value="date_desc">Newest</option>
            <option value="date_asc">Oldest</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
          </select>
        </div>

        {selectedTags.length > 0 && (
          <div className="selected-tags">
            {selectedTags.map((tag) => (
              <div key={tag.label + tag.type} className="filter-tag">
                {tag.label}
                <span onClick={() => removeTag(tag.type, tag.value)}>×</span>
              </div>
            ))}
            <button className="clear-all" onClick={clearAll}>
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="search-body">
        <aside className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}>
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            close={() => setIsFilterOpen(false)}
          />
        </aside>

        {isFilterOpen && (
          <div className="overlay" onClick={() => setIsFilterOpen(false)} />
        )}

        <div className="grid-area">
          {loading ? (
            <p>Loading...</p>
          ) : products.length > 0 ? (
            <ProductGrid
              products={products}
              returnTo={location.pathname + location.search}
            />
          ) : (
            <h2>Sorry, no products found.</h2>
          )}
        </div>
      </div>
    </div>
  );
}
