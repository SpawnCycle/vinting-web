import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import ProductGrid from "../../components/productGrid/ProductGrid";
import FilterPanel from "./FilterPanel";
import "./SearchPage.css";

import type { ProductUI } from "../../types/Product/ProductUI";
import type { FiltersState } from "../../types/Search";
import { getProductsPaginated } from "../../api/productsApi";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";

type SortByType = "date_asc" | "date_desc" | "price_asc" | "price_desc";

const ITEMS_PER_PAGE = 4; //Később lehet több, tesztelés kedvéért 4

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

  const parseFiltersFromURL = (): FiltersState => {
    const asc_str = searchParams.get("asc");
    const asc = asc_str !== null && asc_str === "true";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1,
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const { loading, setLoading } = useLoading();
  const { showToast } = useToast();

  const handleSetFilters: React.Dispatch<React.SetStateAction<FiltersState>> = (
    action,
  ) => {
    setCurrentPage(1);
    setFilters(action);
  };

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
    if (query) params.set("q", query);
    params.set("page", String(currentPage));

    setSearchParams(params, { replace: true });
  }, [filters, query, currentPage, setSearchParams]);

  // fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const apiFilters = {
          search: query || undefined,
          gender: filters.gender || undefined,
          colors: filters.colors.length ? filters.colors : undefined,
          sizes: filters.sizes.length ? filters.sizes : undefined,
          categories: filters.categories.length
            ? filters.categories
            : undefined,
          conditions: filters.conditions.length
            ? filters.conditions
            : undefined,
          sort_by: filters.sort_by,
          asc: filters.asc,
          page: currentPage,
          itemsPerPage: ITEMS_PER_PAGE,
        };

        const {
          products: data,
          pages,
          items,
        } = await getProductsPaginated(apiFilters);

        setProducts(data);
        setTotalPages(pages);
        setTotalItems(items);
      } catch (err) {
        console.error("Fetch failed:", err);
        showToast("Failed to load products", "Please try again.", "system");
      }

      setLoading(false);
    };

    fetchProducts();
  }, [filters, query, currentPage]);

  const removeTag = (type: keyof FiltersState, value?: string) => {
    if (type === "gender") {
      handleSetFilters((prev) => ({ ...prev, gender: null }));
      return;
    }
    handleSetFilters((prev) => ({
      ...prev,
      [type]: (prev[type] as string[]).filter((v) => v !== value),
    }));
  };

  const clearAll = () => {
    handleSetFilters(defaultFilters);
    setQuery("");
    setQueryInput("");
  };

  const selectedTags = useMemo(() => {
    const tags: { label: string; type: keyof FiltersState; value?: string }[] =
      [];

    if (filters.gender) tags.push({ label: filters.gender, type: "gender" });
    filters.sizes.forEach((s) =>
      tags.push({ label: s, type: "sizes", value: s }),
    );
    filters.colors.forEach((c) =>
      tags.push({ label: c, type: "colors", value: c }),
    );
    filters.categories.forEach((c) =>
      tags.push({ label: c, type: "categories", value: c }),
    );
    filters.conditions.forEach((c) =>
      tags.push({ label: c, type: "conditions", value: c }),
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
                setCurrentPage(1);
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

          <select
            className="sort-select"
            value={selectedSortBy}
            onChange={(e) => {
              const sort_type = e.target.value as SortByType;
              setSelectedSortBy(sort_type);

              let sort = "date" as FiltersState["sort_by"];
              let asc = false;
              switch (sort_type) {
                default:
                case "date_desc":
                  sort = "date";
                  asc = false;
                  break;
                case "date_asc":
                  sort = "date";
                  asc = true;
                  break;
                case "price_asc":
                  sort = "price";
                  asc = true;
                  break;
                case "price_desc":
                  sort = "price";
                  asc = false;
                  break;
              }

              handleSetFilters((prev) => ({ ...prev, sort_by: sort, asc }));
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

        {!loading && (
          <p className="results-count">{totalItems} products found</p>
        )}
      </div>

      <div className="search-body">
        <aside className={`filter-sidebar ${isFilterOpen ? "open" : ""}`}>
          <FilterPanel
            filters={filters}
            setFilters={handleSetFilters}
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
            <>
              <ProductGrid
                products={products}
                returnTo={location.pathname + location.search}
              />

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    ‹
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`page-btn ${currentPage === page ? "active" : ""}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    ›
                  </button>
                </div>
              )}
            </>
          ) : (
            <h2>Sorry, no products found.</h2>
          )}
        </div>
      </div>
    </div>
  );
}
