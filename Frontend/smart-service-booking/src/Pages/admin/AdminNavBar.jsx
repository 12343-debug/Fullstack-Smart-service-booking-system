import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "black" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Button
          color="rgb(15,23,42)"
          sx={{ fontWeight: 700 }}
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </Button>

        <Button
          color="rgb(15,23,42)"
          sx={{ fontWeight: 700 }}
          onClick={() => navigate("/admin/add-service")}
        >
          Add Service
        </Button>

        <Button
          color="rgb(15,23,42)"
          sx={{ fontWeight: 700 }}
          onClick={() => navigate("/services")}
        >
          Available Services
        </Button>
        <Button
         color="rgb(15,23,42)"
          sx={{ fontWeight: 700 }}
          onClick={() => navigate("/admin/services")}
        >
          Manage Services
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
