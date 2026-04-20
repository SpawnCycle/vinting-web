import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/welcome" ||
    location.pathname === "/profile/my-listings" ||
    location.pathname.startsWith("/product/") ||
    location.pathname.startsWith("/order/") ||
    location.pathname.startsWith("/profile/my-orders") ||
    location.pathname.startsWith("/admin");

  return (
    <div className={`app-layout ${hideNavbar ? "no-navbar" : ""}`}>
      {!hideNavbar && <Navbar />}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
