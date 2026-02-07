import { AppBar, Button, Toolbar, Typography,Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, mr: 9 }}>
          Smart Service Booking
        </Typography>
        {!token && (
          <Box>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/">Register</Button>
          </Box>
        )}
       {token && (
        <Box>
           <Button
          color="inherit"
          sx={{ fontSize: 22, fontWeight: 500 }}
          component={Link}
          to="/"
        >
          Home
        </Button>
        <Button
          color="inherit"
          sx={{ fontSize: 22, fontWeight: 500 }}
          component={Link}
          to="/services"
        >
          Services
        </Button>
        <Button color="inherit" component={Link} to="/bookings">
          Bookings
        </Button>
        <Button
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          variant="outlined"
          sx={{
            borderColor: "red",
            color: "white",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "rgba(255,0,0,0.1)",
              borderColor: "red",
            },
          }}
        >
          Logout
        </Button>
        </Box>
       )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
