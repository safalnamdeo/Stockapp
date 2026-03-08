import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { DashboardLayout } from "../components/DashboardLayout";

export function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout />;
}
