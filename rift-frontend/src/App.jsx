// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import SellProduct from "./pages/SellProduct";
import Profile from "./pages/Profile";
import ManageAccount from "./pages/ManageAccount";
import LikedProductsPage from "./pages/LikedProductsPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LikeProvider } from "./context/LikeContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user && user.role === "admin" ? children : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LikeProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/sell"
                element={
                  <ProtectedRoute>
                    <SellProduct />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <ManageAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/liked"
                element={
                  <ProtectedRoute>
                    <LikedProductsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route path="/contact" element={<div className="container mt-8">Contact Page (Placeholder)</div>} />
            </Routes>
            <Footer />
          </Router>
        </LikeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;