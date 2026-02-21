import "./App.css";
import Home from "./Pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Services from "./Pages/Services.jsx";
import Bookings from "./Pages/Bookings.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";


function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
      </Routes>
    </>
  );
}

export default App;
