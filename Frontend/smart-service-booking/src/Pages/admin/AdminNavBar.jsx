import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2c2c2c" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Button color="inherit" onClick={() => navigate("/admin")}>
          Dashboard
        </Button>

        <Button color="inherit" onClick={() => navigate("/admin/add-service")}>
          Add Service
        </Button>

        <Button color="inherit" onClick={() => navigate("/services")}>
          Available Services
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;