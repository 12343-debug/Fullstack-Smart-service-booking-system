import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navButtonSx = {
    fontWeight: 700,
    textTransform: "none",
    borderRadius: 999,
    px: 1.8,
    color: "#173d32",
  };

  const activeButtonSx = (path) => ({
    ...navButtonSx,
    ...(location.pathname === path
      ? {
          color: "#fffaf2",
          background: "linear-gradient(135deg, #173d32, #0f766e)",
          boxShadow: "0 12px 24px rgba(20, 83, 45, 0.2)",
        }
      : {
          "&:hover": {
            color: "#fffaf2",
            background: "linear-gradient(135deg, #173d32, #0f766e)",
          },
        }),
  });

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "rgba(255, 252, 246, 0.82)",
        border: "1px solid rgba(124, 104, 72, 0.16)",
        borderRadius: 3.5,
        color: "#173d32",
        boxShadow: "var(--shadow-card)",
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
          sx={activeButtonSx("/admin")}
          onClick={() => navigate("/admin")}
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          sx={activeButtonSx("/admin/add-service")}
          onClick={() => navigate("/admin/add-service")}
        >
          Add Service
        </Button>

        <Button
          color="inherit"
          sx={activeButtonSx("/services")}
          onClick={() => navigate("/services")}
        >
          Available Services
        </Button>
        <Button
          color="inherit"
          sx={activeButtonSx("/admin/services")}
          onClick={() => navigate("/admin/services")}
        >
          Manage Services
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
