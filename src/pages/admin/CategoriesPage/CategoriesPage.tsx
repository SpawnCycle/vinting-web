import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useLoading } from "@/context/LoadingContext";
import "./CategoriesPage.css";

type Category = {
  id: number;
  name: string;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const { showToast } = useToast();
  const { setLoading } = useLoading();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);

      const res = await fetch("/api/categories/", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setCategories(data);
    } catch {
      showToast("Error", "Failed to load categories.", "error");
    } finally {
      setLoading(false);
    }
  }

  // CREATE
  async function handleCreate() {
    if (!newName.trim()) {
      showToast("Error", "Category name is required.", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/categories/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error();

      setNewName("");
      showToast("Success", "Category created.", "success");

      await fetchCategories(); // 🔥 FRISSÍTÉS
    } catch {
      showToast("Error", "Failed to create category.", "error");
    } finally {
      setLoading(false);
    }
  }

  // DELETE
  async function handleDelete(id: number) {
    if (!confirm("Delete this category?")) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      showToast("Success", "Category deleted.", "success");

      await fetchCategories(); // 🔥 EZ A FIX
    } catch {
      showToast("Error", "Failed to delete category.", "error");
    } finally {
      setLoading(false);
    }
  }

  // UPDATE
  async function handleUpdate(id: number) {
    if (!editingName.trim()) {
      showToast("Error", "Name required.", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id,
          name: editingName,
        }),
      });

      if (!res.ok) throw new Error();

      setEditingId(null);
      setEditingName("");

      showToast("Success", "Category updated.", "success");

      await fetchCategories();
    } catch {
      showToast("Error", "Failed to update category.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="categories">
      <div className="categories-header">
        <h2>Categories</h2>

        <div className="categories-add">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category..."
          />

          <button className="add-btn" onClick={handleCreate} type="button">
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="empty">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>

                  <td>
                    {editingId === cat.id ? (
                      <input
                        className="edit-input"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                      />
                    ) : (
                      cat.name
                    )}
                  </td>

                  <td className="actions">
                    {editingId === cat.id ? (
                      <button
                        className="save-btn"
                        onClick={() => handleUpdate(cat.id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="icon-btn"
                        onClick={() => {
                          setEditingId(cat.id);
                          setEditingName(cat.name);
                        }}
                      >
                        <Pencil size={16} />
                      </button>
                    )}

                    <button
                      className="icon-btn danger"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
