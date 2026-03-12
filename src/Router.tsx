import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import Welcome from "./pages/welcome/Welcome";
import Home from "./pages/home/Home";
import Upload from "./pages/upload/Upload";
import Favorites from "./pages/favorites/Favorites";
import Profile from "./pages/profile/Profile";
import MyListings from "./pages/myListings/MyListings";
import ProductPage from "./pages/productPage/ProductPage";
import EditProductPage from "./pages/editProduct/EditProduct";
import Search from "./pages/searchPage/SearchPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/my-listings"
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route
            path="/product/:id/edit"
            element={
              <ProtectedRoute>
                <EditProductPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
