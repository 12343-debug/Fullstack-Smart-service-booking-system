import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
    navigate("/login");
  };
  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{ backgroundColor: "#ffffff", color: "#1a1a1a", px: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ cursor: "pointer", color: "1976d2" }}
          onClick={() => navigate("/home")}
        >
          Smart Service
        </Typography>
        {!token && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              sx={{ fontWeight: 200, fontSize: "22px", fontStyle: "inherit" }}
              component={Link}
              to="/home"
            >
              Home
            </Button>
            <Button
              color="success"
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                padding: "5px",
                height: "32px",
                margin: "10px",
                fontWeight: 600,
              }}
            >
              Register
            </Button>
            <Button component={Link} to="/login" sx={{ textTransform: "none" }}>
              Login
            </Button>
          </Box>
        )}
        {token && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              color="inherit"
              sx={{ fontSize: "22px", fontWeight: 500 }}
              component={Link}
              to="/services"
            >
              Services
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/bookings"
              sx={{ fontSize: "22px" }}
            >
              Bookings
            </Button>
            <IconButton onClick={handleProfileClick}>
              <AccountCircleIcon fontSize="large" />
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
                onClick={() => {
                  navigate("/bookings");
                  handleClose();
                }}
              >
                My Bookings
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
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
