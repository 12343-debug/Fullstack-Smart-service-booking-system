import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const navButtonSx = {
    fontWeight: 700,
    textTransform: "none",
    borderRadius: 2,
    px: 1.5,
    color: "#0f172a",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#0f172a",
    },
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255,255,255,0.9)",
        border: "1px solid #d7dee8",
        borderRadius: 2.5,
        color: "#0f172a",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 1, md: 2 },
          flexWrap: "wrap",
          py: 0.5,
        }}
      >
        <Button
          color="inherit"
          sx={navButtonSx}
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          sx={navButtonSx}
          onClick={() => navigate("/admin/add-service")}
        >
          Add Service
        </Button>

        <Button
          color="inherit"
          sx={navButtonSx}
          onClick={() => navigate("/services")}
        >
          Available Services
        </Button>
        <Button
          color="inherit"
          sx={navButtonSx}
          onClick={() => navigate("/admin/services")}
        >
          Manage Services
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
