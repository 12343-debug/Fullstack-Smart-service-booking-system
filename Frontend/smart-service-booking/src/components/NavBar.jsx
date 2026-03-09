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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const navButtonSx = {
    textTransform: "none",
    fontWeight: 600,
    fontStyle: "normal",
    letterSpacing: 0.2,
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    fontSize: { xs: 14, md: 15 },
    color: "#0f172a",
    px: 1.6,
    borderRadius: 2,
    minWidth: "auto",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#ffffff",
      background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
      boxShadow: "0 8px 18px rgba(15, 23, 42, 0.25)",
    },
  };

  const primaryButtonSx = {
    textTransform: "none",
    fontWeight: 700,
    fontStyle: "normal",
    letterSpacing: 0.2,
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    fontSize: { xs: 14, md: 15 },
    borderRadius: 2,
    px: 2,
    backgroundColor: "#0f172a",
    "&:hover": {
      backgroundColor: "#020617",
    },
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 12,
        left: { xs: 10, md: 24 },
        right: { xs: 10, md: 24 },
        width: "auto",
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        background: "rgba(248, 250, 252, 0.92)",
        border: "1px solid #d7dee8",
        color: "#0f172a",
        borderRadius: 3,
        backdropFilter: "blur(10px)",
        boxShadow: "0 12px 24px rgba(15, 23, 42, 0.10)",
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
              borderRadius: 2.2,
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(145deg, #0f172a, #1d4ed8)",
              color: "#fff",
              boxShadow: "0 6px 14px rgba(29, 78, 216, 0.35)",
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
                fontFamily: "'Poppins', 'Segoe UI', sans-serif",
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
                fontStyle: "italic",
                fontFamily: "'Poppins', 'Segoe UI', sans-serif",
              }}
            >
              Fast, Reliable, Professional
            </Typography>
          </Box>
        </Box>
        {!token && (
          <Box sx={{ display: "flex", gap: { xs: 0.5, md: 1 }, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              sx={navButtonSx}
              component={Link}
              to="/home"
            >
              Home
            </Button>
            <Button
              color="inherit"
              sx={navButtonSx}
              component={Link}
              to="/admin"
            >
              Admin
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
              variant="contained"
              sx={primaryButtonSx}
            >
              Register
            </Button>
            <Button component={Link} to="/login" sx={navButtonSx}>
              Login
            </Button>
          </Box>
        )}

        {token && (
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 }, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Button
              color="inherit"
              sx={navButtonSx}
              onClick={() => navigate("/admin")}
            >
              Admin
            </Button>
            
            <Button
              color="inherit"
              sx={navButtonSx}
              component={Link}
              to="/services"
            >
              Services
            </Button>

            <Button
              color="inherit"
              component={Link}
              to="/bookings"
              sx={navButtonSx}
            >
              Bookings
            </Button>
            <Chip
              label="Account"
              size="small"
              sx={{
                backgroundColor: "#e2e8f0",
                color: "#0f172a",
                fontWeight: 600,
                fontFamily: "'Poppins', 'Segoe UI', sans-serif",
                letterSpacing: 0.2,
                display: { xs: "none", sm: "inline-flex" },
              }}
            />
            <IconButton
              onClick={handleProfileClick}
              sx={{
                border: "1px solid #cbd5e1",
                backgroundColor: "#fff",
                "&:hover": { backgroundColor: "#f1f5f9" },
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
                sx={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", fontWeight: 500 }}
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
                  fontFamily: "'Poppins', 'Segoe UI', sans-serif",
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
