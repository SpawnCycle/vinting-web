import { Link, useLocation } from "react-router-dom";
import {
  CgCalendarTwo,
  CgAdd,
  CgHeart,
  CgProfile,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);

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
      if ( isOpen && navbarRef.current && !navbarRef.current.contains(e.target as Node) ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <nav ref={navbarRef} className={`navbar ${isOpen ? "open" : "closed"}`}>
      <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>
        <CgCalendarTwo className={`nav-icon ${isActive("/") ? "active" : ""}`}/>
        <span className={`nav-text ${isActive("/") ? "active" : ""}`}>
          Home page
        </span>
      </Link>

      <Link to="/upload" className="nav-item" onClick={() => setIsOpen(false)}>
        <CgAdd className={`nav-icon ${isActive("/upload") ? "active" : ""}`}/>
        <span className={`nav-text ${isActive("/upload") ? "active" : ""}`}>
          Upload
        </span>
      </Link>

      <Link to="/favorites" className="nav-item" onClick={() => setIsOpen(false)}>
        <CgHeart className={`nav-icon ${isActive("/favorites") ? "active" : ""}`}/>
        <span className={`nav-text ${isActive("/favorites") ? "active" : ""}`}>
          Favorites
        </span>
      </Link>

      <Link to="/profile" className="nav-item" onClick={() => setIsOpen(false)}>
        <CgProfile className={`nav-icon ${isActive("/profile") ? "active" : ""}`}/>
        <span className={`nav-text ${isActive("/profile") ? "active" : ""}`}>
          Profile
        </span>
      </Link>

      <button 
        className="toggle-btn"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(prev => !prev);
        }}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <CgChevronLeft /> : <CgChevronRight />}
      </button>
    </nav>
  );
}
