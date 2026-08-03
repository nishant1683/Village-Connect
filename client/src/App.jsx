import { Route, Routes, Navigate } from "react-router-dom";

// Auth pages (standalone, no layout)
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLogin from "./pages/auth/AdminLogin";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Protected route guards
import {
  UserProtectedRoute,
  AdminProtectedRoute,
} from "./components/ProtectedRoute";

// Public shopping pages
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import SearchProducts from "./pages/shopping-view/search";
import AboutPage from "./pages/shopping-view/about";
import ContactPage from "./pages/shopping-view/contact";

// User-protected shopping pages
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingCartPage from "./pages/shopping-view/cart";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";

// User dashboard
import UserDashboard from "./pages/user/Dashboard";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import CreateLocation from "./pages/admin/CreateLocation";

// Fallback pages
import NotFound from "./pages/not-found";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        {/* ── Public auth pages (no layout) ── */}
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/admin/login" element={<AdminLogin />} />

        {/* ── Public shopping pages (MainLayout) ── */}
        <Route
          path="/shop/home"
          element={
            <MainLayout>
              <ShoppingHome />
            </MainLayout>
          }
        />
        <Route
          path="/shop/listing"
          element={
            <MainLayout>
              <ShoppingListing />
            </MainLayout>
          }
        />
        <Route
          path="/shop/search"
          element={
            <MainLayout>
              <SearchProducts />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />

        {/* ── User-protected shopping pages ── */}
        <Route
          path="/shop/checkout"
          element={
            <UserProtectedRoute>
              <MainLayout>
                <ShoppingCheckout />
              </MainLayout>
            </UserProtectedRoute>
          }
        />
        <Route
          path="/shop/account"
          element={
            <UserProtectedRoute>
              <MainLayout>
                <ShoppingAccount />
              </MainLayout>
            </UserProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <UserProtectedRoute>
              <MainLayout>
                <ShoppingCartPage />
              </MainLayout>
            </UserProtectedRoute>
          }
        />
        <Route
          path="/shop/paypal-return"
          element={
            <UserProtectedRoute>
              <PaypalReturnPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/shop/payment-success"
          element={
            <UserProtectedRoute>
              <PaymentSuccessPage />
            </UserProtectedRoute>
          }
        />

        {/* ── User dashboard ── */}
        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute>
              <MainLayout>
                <UserDashboard />
              </MainLayout>
            </UserProtectedRoute>
          }
        />

        {/* ── Admin-protected routes (AdminLayout) ── */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/create-location"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <CreateLocation />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
