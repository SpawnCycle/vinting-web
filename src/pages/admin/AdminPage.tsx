import { useState } from "react";
import "./AdminPage.css";
import { CgMenu } from "react-icons/cg";
import { useAuth } from "@/context/AuthContext";
import UsersPage from "./UsersPage/UsersPage";
import CategoriesPage from "./CategoriesPage/CategoriesPage";

type Tab = "users" | "categories";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const saved = localStorage.getItem("admin-tab");
    return (saved as Tab) || "users";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img src="/images/logo_800x800.png" alt="Vinting Logo" />
          <h2>VINTING</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => {
              setActiveTab("users");
              localStorage.setItem("admin-tab", "users");
              setSidebarOpen(false);
            }}
          >
            Users
          </button>

          <button
            className={activeTab === "categories" ? "active" : ""}
            onClick={() => {
              setActiveTab("categories");
              localStorage.setItem("admin-tab", "categories");
              setSidebarOpen(false);
            }}
          >
            Categories
          </button>

          <a href="/" className="back-link">
            ← Back to Vinting
          </a>
        </nav>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* CONTENT */}
      <main className="admin-content">
        <div className="admin-topbar">
          <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
            <CgMenu />
          </button>
          <h1>Admin Panel</h1>
          <hr />
        </div>

        <div className="admin-container">
          {activeTab === "users" && <UsersPage />}
          {activeTab === "categories" && <CategoriesPage />}
        </div>
      </main>
    </div>
  );
}
