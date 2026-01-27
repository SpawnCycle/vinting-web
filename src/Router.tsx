import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/welcome/Welcome";
import Home from "./pages/home/Home";
import Upload from "./pages/upload/Upload";
import Favorites from "./pages/favorites/Favorites";
import Profile from "./pages/profile/Profile";
import MyListings from "./pages/myListings/MyListings";
import ProductPage from "./pages/productPage/ProductPage";

import Navbar from "./components/navbar/Navbar";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/my-listings" element={<MyListings />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}
