import "./App.css";
import Home from "./Pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Services from "./Pages/Services.jsx";
import Bookings from "./Pages/Bookings.jsx";
import Register from "./Pages/Register.jsx";
import Login from "./Pages/Login.jsx";
import ProtectedRoutes from "./components/routes/ProtectedRoutes.jsx";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/services" element={<Services />} />
        <Route path="/bookings" element={<Bookings />} /> */}
        <Route
          path="/services"
          element={
            <ProtectedRoutes>
              <Services />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoutes>
              <Bookings />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
