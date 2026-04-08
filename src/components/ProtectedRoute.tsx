import { Navigate } from "react-router-dom";
import { getToken } from "@/lib/apiClient";

export function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

