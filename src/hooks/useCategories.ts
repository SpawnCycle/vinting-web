import { useEffect, useState } from "react";
import { getCategories } from "@/api/categoriesApi";

export type Category = {
  id: number;
  name: string;
};

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCategories();
        setCategories(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { categories, loading };
}
