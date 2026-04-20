import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";
import { useLoading } from "@/context/LoadingContext";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const { setLoading } = useLoading();

  const hasShownToast = useRef(false);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  if (loading) return null;

  if (!user) return <Navigate to="/welcome" replace />;

  if (requiredRole) {
    const roles = user.roles ?? [];
    const hasRole = roles.includes(requiredRole);

    if (!hasRole) {
      if (!hasShownToast.current) {
        showToast(
          "Access denied",
          "You do not have permission to access this page.",
          "system",
        );
        hasShownToast.current = true;
      }

      return <Navigate to="/welcome" replace />;
    }
  }

  return children;
}
