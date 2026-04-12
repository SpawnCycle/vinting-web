import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { getProductByUser, getProducts } from "../../api/productsApi";

import { FiEdit2, FiSun, FiMoon, FiLogOut } from "react-icons/fi";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import "./Profile.css";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/api/authApi";
import { useToast } from "@/context/ToastContext";

export default function Profile() {
  const navigate = useNavigate();

  const { showToast } = useToast();

  const { theme, toggleTheme } = useTheme();

  const { user, setUser } = useAuth();
  const USER_ID = user?.id;

  const [products, setProducts] = useState<any[]>([]);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  //majd apiról
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState("password");
  const [confPassword, setConfPassword] = useState("password");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!USER_ID) return;
      const userProducts = await getProductByUser(USER_ID);

      setProducts(userProducts || []);

      // favorites mock (később API?)
      setFavoritesCount(0);
    }

    loadData();
  }, [USER_ID]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const activeListings = products.filter((p) => p.isAvailable === true).length;
  const soldListings = products.filter(
    (p) => p.isAvailable === false || p.stockAvailable < p.stockStarting,
  ).length;
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
    if (password.length == 0) {
      showToast(
        "Passwords required",
        "Please enter a new password before saving.",
        "error",
      );
    } else if (password !== confPassword) {
      showToast(
        "Passwords don't match",
        "Try again - both fields need to be the same",
        "error",
      );
      setPasswordError(true);
    } else {
      setPassword("password"); //placeholder
      setConfPassword("password"); //placeholder
      setPasswordError(false);
      setShowPassword(false);
      setShowConfPassword(false);
      setEditingPassword(false);
      showToast(
        "Feature unavailable",
        "Sorry, changing your password is not available yet.",
        "system",
      );
    }
  };

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
                    setConfPassword("");
                  } else {
                    setPassword("password"); // edit bezárásakor visszaáll
                    setConfPassword("password");
                  }

                  setEditingPassword(!editingPassword);
                }}
              />
            </div>

            <p className="section-desc">Change your account password.</p>

            <div className="form-group">
              {/* new password */}
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  disabled={!editingPassword}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* eye */}
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
              {/* confirm password  */}
              <div className="password-field">
                <input
                  type={showConfPassword ? "text" : "password"}
                  disabled={!editingPassword}
                  placeholder="The new password again"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
                {/* eye */}
                <span
                  className={`password-toggle ${!editingPassword ? "disabled" : ""}`}
                  onClick={() => {
                    if (!editingPassword) return;
                    setShowConfPassword(!showConfPassword);
                  }}
                >
                  {showConfPassword ? <LuEyeClosed /> : <LuEye />}
                </span>
              </div>
              {/* error */}
              {passwordError && (
                <p style={{ color: "red" }}>Passwords don't match</p>
              )}

              {editingPassword && (
                <button className="btn-primary" onClick={handleSavePassword}>
                  Save password
                </button>
              )}
            </div>
          </section>

          {/* admin */}
          {user?.roles?.includes("Admin") && (
            <button className="admin-btn" onClick={() => navigate("/admin")}>
              Go to Admin Panel
            </button>
          )}

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
