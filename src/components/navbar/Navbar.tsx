import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  CgCalendarTwo,
  CgAdd,
  CgHeart,
  CgProfile,
  CgChevronLeft,
  CgChevronRight,
  CgMoon,
  CgSun,
  CgLogOut,
  CgSearch,
} from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { useTheme } from "@/context/ThemeContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { logout } from "@/api/authApi";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  if (
    location.pathname === "/welcome" ||
    location.pathname === "/profile/my-listings" ||
    location.pathname.startsWith("/product/")
  ) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        isOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav ref={navbarRef} className={`navbar ${isOpen ? "open" : "closed"}`}>
        <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>
          <CgCalendarTwo
            className={`nav-icon ${isActive("/") ? "active" : ""}`}
          />
          <span className={`nav-text ${isActive("/") ? "active" : ""}`}>
            Home page
          </span>
        </Link>
        <Link
          to="/search"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          <CgSearch
            className={`nav-icon ${isActive("/search") ? "active" : ""}`}
          />
          <span className={`nav-text ${isActive("/search") ? "active" : ""}`}>
            Search
          </span>
        </Link>

        <Link
          to="/upload"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          <CgAdd
            className={`nav-icon ${isActive("/upload") ? "active" : ""}`}
          />
          <span className={`nav-text ${isActive("/upload") ? "active" : ""}`}>
            Upload
          </span>
        </Link>

        <Link
          to="/favorites"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          <CgHeart
            className={`nav-icon ${isActive("/favorites") ? "active" : ""}`}
          />
          <span
            className={`nav-text ${isActive("/favorites") ? "active" : ""}`}
          >
            Favorites
          </span>
        </Link>

        <Link
          to="/profile"
          className="nav-item"
          onClick={() => setIsOpen(false)}
        >
          <CgProfile
            className={`nav-icon ${isActive("/profile") ? "active" : ""}`}
          />
          <span className={`nav-text ${isActive("/profile") ? "active" : ""}`}>
            Profile
          </span>
        </Link>

        <button
          className="toggle-btn"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <CgChevronLeft /> : <CgChevronRight />}
        </button>

        <div className="bottomSection">
          {/* Theme toggle */}
          <button
            className="nav-item"
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
          >
            {theme === "light" ? (
              <CgMoon className="nav-icon" />
            ) : (
              <CgSun className="nav-icon" />
            )}
            <span className="nav-text">
              {theme === "light" ? "Dark mode" : "Light mode"}
            </span>
          </button>

          {/* Logout */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                className="nav-item"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <CgLogOut className="nav-icon" />
                <span className="nav-text">Logout</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent
              style={{
                border: "0.5px solid var(--bg-color-third)",
                borderRadius: "10px",
              }}
            >
              <AlertDialogHeader
                style={{
                  padding: "10px",
                  backgroundColor: "var(--bg-color-main)",
                  color: "var(--text-color-main)",
                  borderRadius: "10px 10px 0 0 ",
                }}
              >
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. You will be logged out of your
                  account on this device.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter
                style={{
                  padding: "10px",
                  backgroundColor: "var(--bg-color-secondary)",
                  borderRadius: "0 0 10px 10px",
                }}
              >
                <AlertDialogCancel
                  style={{
                    background: "var(--button-bg-secondary)",
                    color: "var(--button-text-secondary)",
                    padding: "5px 10px",
                    borderRadius: "10px",
                  }}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleLogout()}
                  style={{
                    background: "var(--button-bg-main)",
                    color: "var(--button-text-main)",
                    padding: "5px 10px",
                    borderRadius: "10px",
                  }}
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </nav>
    </>
  );
}
