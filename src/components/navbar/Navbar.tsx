import { Link, useLocation } from "react-router-dom";
import {
  CgCalendarTwo,
  CgAdd,
  CgHeart,
  CgProfile,
  CgChevronLeft,
  CgChevronRight,
} from "react-icons/cg";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
   const location = useLocation();
   const [isOpen, setIsOpen] = useState(false);

   if ( location.pathname === "/welcome" || location.pathname === "/profile/my-listings" )
      return null;

   const isActive = (path: string) => location.pathname === path;

   return (
      <nav className={`navbar ${isOpen ? "open" : "closed"}`}>
         <Link to="/" className="nav-item">
            <CgCalendarTwo className={`nav-icon ${isActive("/") ? "active" : ""}`} />
            <span className={`nav-text ${isActive("/") ? "active" : ""}`}>Home page</span>
         </Link>

         <Link to="/upload" className="nav-item">
            <CgAdd className={`nav-icon ${isActive("/upload") ? "active" : ""}`} />
            <span className={`nav-text ${isActive("/upload") ? "active" : ""}`}>Upload</span>
         </Link>

         <Link to="/favorites" className="nav-item">
            <CgHeart className={`nav-icon ${isActive("/favorites") ? "active" : ""}`} />
            <span className={`nav-text ${isActive("/favorites") ? "active" : ""}`}>Favorites</span>
         </Link>

         <Link to="/profile" className="nav-item">
            <CgProfile className={`nav-icon ${isActive("/profile") ? "active" : ""}`} />
            <span className={`nav-text ${isActive("/profile") ? "active" : ""}`}>Profile</span>
         </Link>

         {/* toggle btn majd csak desktopon */}
         <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <CgChevronLeft /> : <CgChevronRight />}
         </button>
      </nav>
  );
}