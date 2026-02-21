import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Logged in but not admin
  if (role !== "admin") {
    return <Navigate to="/services" />;
  }

  // Admin allowed
  return children;
};

export default AdminRoute;