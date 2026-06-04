import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <Loader2 className="h-10 w-10 animate-spin text-[#1e4d2b]" />
      <p className="mt-2 text-sm text-[#1e4d2b] font-semibold">Loading authentication...</p>
    </div>
  );
}

// User protected route
export const UserProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

// Admin protected route
export const AdminProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!admin) {
    return <Navigate to="/auth/admin/login" state={{ from: location }} replace />;
  }

  return children;
};
