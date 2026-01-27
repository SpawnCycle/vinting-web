import { Link, useLocation } from "react-router-dom";
import { CgCalendarTwo, CgAdd, CgHeart, CgProfile } from "react-icons/cg";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();

  if (
    location.pathname === "/welcome" ||
    location.pathname === "/profile/my-listings"
  )
    return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/">
        <CgCalendarTwo
          className={`nav-icon ${isActive("/") ? "active" : ""}`}
        />
      </Link>

      <Link to="/upload">
        <CgAdd
          className={`nav-icon ${isActive("/upload") ? "active" : ""}`}
        />
      </Link>

      <Link to="/favorites">
        <CgHeart
          className={`nav-icon ${isActive("/favorites") ? "active" : ""}`}
        />
      </Link>

      <Link to="/profile">
        <CgProfile
          className={`nav-icon ${isActive("/profile") ? "active" : ""}`}
        />
      </Link>
    </nav>
  );
}
