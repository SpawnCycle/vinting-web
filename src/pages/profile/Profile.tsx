import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getProducts } from "../../api/productsApi";

import { FiEdit2, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import "./Profile.css";
import { useAuth } from "@/context/AuthContext";
import { logout, whoami } from "@/api/authApi";
import { useToast } from "@/context/ToastContext";

export default function Profile() {
  const { showToast } = useToast();

  const { theme, toggleTheme } = useTheme();

  const { user } = useAuth();
  const USER_ID = user?.id;
  const { setUser } = useAuth();

  const [products, setProducts] = useState<any[]>([]);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  //majd apiról
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("password");

  useEffect(() => {
    async function loadData() {
      const userProducts = await getProducts({
        sellerId: USER_ID,
      });

      setProducts(userProducts);

      // favorites mock (később API)
      setFavoritesCount(8);
    }

    loadData();
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const activeListings = products.filter((p) => p.status === "Active").length;
  const soldListings = products.filter((p) => p.status === "Sold").length;
  const previewProducts = products.slice(0, 3);

  const handleSaveProfile = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    setEditingProfile(false);

    showToast(
      "Feature unavailable",
      "Sorry, profile editing is not available yet.",
      "system",
    );
  };

  const handleSavePassword = () => {
    setPassword("password"); //placeholder
    setShowPassword(false);
    setEditingPassword(false);
    showToast(
      "Feature unavailable",
      "Sorry, changing your password is not available yet.",
      "system",
    );
  };

  const navigate = useNavigate();

  return (
    <div className="profile-page">
      {/* header */}
      <div className="profile-header">
        <h1>Welcome back, {user?.name} &#x1F44B;</h1>
        <p>Manage your profile, listings and preferences.</p>
      </div>

      <div className="profile-layout">
        {/* left */}
        <div className="profile-left">
          {/* stat */}
          <section className="profile-section">
            <h3>Listing summary</h3>
            <p className="section-desc">Track your marketplace activity.</p>

            <div className="stats-grid">
              <div className="stat-card">
                <span>{activeListings}</span>
                <p>Active listings</p>
              </div>

              <div className="stat-card">
                <span>{soldListings}</span>
                <p>Sold items</p>
              </div>

              <div className="stat-card">
                <span>{favoritesCount}</span>
                <p>Favorites</p>
              </div>
            </div>
          </section>

          {/* teheme */}
          <section className="profile-section">
            <h3>Theme</h3>
            <p className="section-desc">
              Choose between light and dark appearance.
            </p>

            <div className="theme-switch">
              <div className="theme-icons">
                <FiSun
                  className={
                    theme === "light" ? "theme-icon active" : "theme-icon"
                  }
                />

                <FiMoon
                  className={
                    theme === "dark" ? "theme-icon active" : "theme-icon"
                  }
                />
              </div>

              <button className="btn-primary" onClick={toggleTheme}>
                {theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"}
              </button>
            </div>
          </section>

          {/* my listings */}
          <section className="profile-section">
            <div className="section-header">
              <div>
                <h3>My listings</h3>
                <p className="section-desc">Recent items you have listed.</p>
              </div>
            </div>

            <div className="mini-products">
              {previewProducts.map((p) => (
                <div className="mini-product" key={p.id}>
                  <img src={p.images?.[0]} />
                  <span>{p.brand}</span>
                </div>
              ))}

              <Link
                to="/profile/my-listings"
                state={{ returnTo: "/profile" }}
                className="mini-product"
              >
                <div className="more-card">...</div>
                <span>View all</span>
              </Link>
            </div>

            <Link to="/profile/my-listings" state={{ returnTo: "/profile" }}>
              <button className="btn-secondary">Go to My Listings</button>
            </Link>
          </section>
        </div>

        {/* right */}
        <div className="profile-right">
          {/* prof det */}
          <section className="profile-section">
            <div className="section-header">
              <h3>Profile information</h3>

              <FiEdit2
                className="edit-icon"
                onClick={() => setEditingProfile(!editingProfile)}
              />
            </div>

            <p className="section-desc">Update your name and email.</p>

            <div className="form-group">
              <label>Name</label>

              <input
                disabled={!editingProfile}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Email</label>

              <input
                disabled={!editingProfile}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {editingProfile && (
                <button className="btn-primary" onClick={handleSaveProfile}>
                  Save
                </button>
              )}
            </div>
          </section>

          {/* password */}
          <section className="profile-section">
            <div className="section-header">
              <h3>Password</h3>

              <FiEdit2
                className="edit-icon"
                onClick={() => {
                  if (!editingPassword) {
                    setPassword(""); // edit indításakor törlődik
                  } else {
                    setPassword("password"); // edit bezárásakor visszaáll
                  }

                  setEditingPassword(!editingPassword);
                }}
              />
            </div>

            <p className="section-desc">Change your account password.</p>

            <div className="form-group">
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={!editingPassword}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className={`password-toggle ${!editingPassword ? "disabled" : ""}`}
                  onClick={() => {
                    if (!editingPassword) return;
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <LuEyeClosed /> : <LuEye />}
                </span>
              </div>

              {editingPassword && (
                <button className="btn-primary" onClick={handleSavePassword}>
                  Save password
                </button>
              )}
            </div>
          </section>

          {/* logout */}
          <button
            className="logout-btn"
            onClick={() => {
              logout();
              setUser(null);
            }}
          >
            <FiLogOut className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
