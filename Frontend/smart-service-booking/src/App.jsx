import "./App.css";
import Home from "./Pages/Home.jsx";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Services from "./Pages/Services.jsx";
import Bookings from "./Pages/Bookings.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import AuthSuccess from "./Pages/AuthSuccess.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import AddService from "./Pages/admin/AddService.jsx";
import AdminServices from "./Pages/admin/AdminServices.jsx";

function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").trim().toLowerCase();
  const defaultRoute = token ? (role === "admin" ? "/admin" : "/bookings") : "/home";
  const hasAuthSuccessState = Boolean(location.state?.title || location.state?.message);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route
          path="/home"
          element={token ? <Navigate to="/bookings" replace /> : <Home />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to={defaultRoute} replace /> : <Login />}
        />
        <Route
          path="/register"
          element={token ? <Navigate to={defaultRoute} replace /> : <Register />}
        />
        <Route
          path="/admin/login"
          element={token ? <Navigate to={defaultRoute} replace /> : <Login />}
        />
        <Route
          path="/admin/register"
          element={token ? <Navigate to={defaultRoute} replace /> : <Register />}
        />
        <Route
          path="/auth-success"
          element={
            token || hasAuthSuccessState ? (
              <AuthSuccess />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="admin/add-service"
          element={
            <AdminRoute>
              <AddService />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <AdminRoute>
              <AdminServices />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to={defaultRoute} replace />} />
      </Routes>
    </>
  );
}

export default App;
