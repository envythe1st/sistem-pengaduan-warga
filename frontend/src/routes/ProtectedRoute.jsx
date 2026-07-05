import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    switch (role) {
      case "SUPER_ADMIN":
        return <Navigate to="/admin/dashboard" replace />;

      case "RW":
        return <Navigate to="/rw/dashboard" replace />;

      case "WARGA":
        return <Navigate to="/warga/dashboard" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
}