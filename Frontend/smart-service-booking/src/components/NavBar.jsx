import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { useState } from "react";
import toast from "react-hot-toast";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = (localStorage.getItem("role") || "").trim().toLowerCase();

  // dropdown state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/home", { replace: true });
  };

  const handleAdminAccess = () => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (role !== "admin") {
      toast.error("Please logout and login with an admin account.");
      return;
    }

    navigate("/admin");
  };

  const navButtonSx = {
    textTransform: "none",
    fontWeight: 700,
    fontStyle: "normal",
    letterSpacing: 0.2,
    fontSize: { xs: 14, md: 15 },
    color: "#173d32",
    px: 1.6,
    borderRadius: 999,
    minWidth: "auto",
    transition: "all 0.2s ease",
    border: "1px solid transparent",
  };

  const getButtonSx = (path) => ({
    ...navButtonSx,
    ...(location.pathname === path
      ? {
          color: "#fffaf2",
          background: "linear-gradient(135deg, #173d32, #0f766e)",
          boxShadow: "0 12px 24px rgba(20, 83, 45, 0.22)",
        }
      : {
          "&:hover": {
            color: "#fffaf2",
            background: "linear-gradient(135deg, #173d32, #0f766e)",
            boxShadow: "0 12px 24px rgba(20, 83, 45, 0.18)",
          },
        }),
  });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 12,
        left: { xs: 10, md: 24 },
        right: { xs: 10, md: 24 },
        width: "auto",
        background: "rgba(255, 252, 246, 0.82)",
        border: "1px solid rgba(124, 104, 72, 0.16)",
        color: "#173d32",
        borderRadius: 4,
        backdropFilter: "blur(14px)",
        boxShadow: "var(--shadow-card)",
        zIndex: 1300,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: "68px !important",
          px: { xs: 1, md: 2 },
          gap: 1,
        }}
      >
        <Box
          onClick={() => navigate("/home")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            cursor: "pointer",
            minWidth: "fit-content",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(145deg, #173d32, #0f766e)",
              color: "#fff",
              boxShadow: "0 10px 22px rgba(20, 83, 45, 0.28)",
            }}
          >
            <MiscellaneousServicesIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: 14, md: 16 },
                lineHeight: 1.1,
                letterSpacing: 0.2,
              }}
            >
              Smart Service Booking
            </Typography>
            <Typography
              sx={{
                color: "#64748b",
                fontSize: 11,
                lineHeight: 1.1,
                fontWeight: 500,
                letterSpacing: 0.2,
              }}
            >
              Book cleanly. Track clearly.
            </Typography>
          </Box>
        </Box>
        {!token && (
          <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 }, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              sx={getButtonSx("/home")}
              component={Link}
              to="/home"
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={navButtonSx}
              onClick={handleAdminAccess}
            >
              Admin
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              sx={getButtonSx("/register")}
            >
              Register
            </Button>
            <Button component={Link} to="/login" sx={getButtonSx("/login")}>
              Login
            </Button>
          </Box>
        )}

        {token && (
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 }, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              sx={navButtonSx}
              onClick={handleAdminAccess}
            >
              Admin
            </Button>
            
            <Button
              color="inherit"
              sx={getButtonSx("/services")}
              component={Link}
              to="/services"
            >
              Services
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/bookings"
              sx={getButtonSx("/bookings")}
            >
              Bookings
            </Button>
            <Chip
              label="Account"
              size="small"
              sx={{
                backgroundColor: "#e2e8f0",
                color: "#173d32",
                fontWeight: 700,
                letterSpacing: 0.2,
                display: { xs: "none", sm: "inline-flex" },
              }}
            />
            <IconButton
              onClick={handleProfileClick}
              sx={{
                border: "1px solid #cbd5e1",
                backgroundColor: "rgba(255,255,255,0.72)",
                "&:hover": { backgroundColor: "#fffaf2" },
              }}
            >
              <AccountCircleIcon fontSize="medium" />
            </IconButton>
            {/* DROPDOWN MENU */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                sx={{ fontWeight: 600 }}
                onClick={() => {
                  navigate("/bookings");
                  handleClose();
                }}
              >
                My Bookings
              </MenuItem>

              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "#dc2626",
                  fontWeight: 600,
                }}
              >
                <LogoutIcon fontSize="small" sx={{ mr: 1, color: "#dc2626" }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
