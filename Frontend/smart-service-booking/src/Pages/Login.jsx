import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlineRoundedIcon from "@mui/icons-material/LockOutlineRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import QueryBuilderRoundedIcon from "@mui/icons-material/QueryBuilderRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AuthShell from "../components/AuthShell";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isAdminAuth = location.pathname.startsWith("/admin/");

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      const normalizedRole = (res.role || "").toString().trim().toLowerCase();

      if (isAdminAuth && normalizedRole !== "admin") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        toast.error(
          normalizedRole
            ? `This account has role "${normalizedRole}", not admin.`
            : "This account is not configured as admin.",
        );
        return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", normalizedRole);

      navigate("/auth-success", {
        state: {
          title: isAdminAuth ? "Admin Login Successful" : "Login Successful",
          message: isAdminAuth
            ? "Welcome back. Admin access is ready and your dashboard is available."
            : "Welcome back. Your account is ready and you can continue to services.",
          buttonLabel: isAdminAuth ? "Go To Dashboard" : "Go To Services",
          redirectTo: isAdminAuth ? "/admin" : normalizedRole === "admin" ? "/admin" : "/services",
        },
      });
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed";

      if (isAdminAuth && message === "Invalid credentials") {
        toast.error("Admin login failed. Check the admin email and password.");
        return;
      }

      toast.error(message);
    }
  };

  return (
    <AuthShell
      badge={isAdminAuth ? "Admin Login" : "Secure Login"}
      formTitle={isAdminAuth ? "Admin access" : "Welcome back"}
      formSubtitle={
        isAdminAuth
          ? "Sign in with an admin account to manage services, bookings, and platform operations."
          : "Access your bookings, track service progress, and manage requests from one place."
      }
      sideEyebrow={isAdminAuth ? "Control Panel Access" : "Member Access"}
      sideTitle={
        isAdminAuth
          ? "Restricted entry for verified administrators only."
          : "Operations-grade access for your everyday service workflow."
      }
      sideDescription={
        isAdminAuth
          ? "Use the same polished auth experience, but scoped for admin operations and dashboard-level control."
          : "A cleaner sign-in experience with faster access to your upcoming visits, verified professionals, and previous booking history."
      }
      sidePoints={[
        {
          title: isAdminAuth ? "Service management control" : "Instant booking visibility",
          description: isAdminAuth
            ? "Review bookings, manage services, and handle platform updates from a protected admin dashboard."
            : "Open the dashboard and review active, pending, and completed visits without extra steps.",
          icon: <EventAvailableRoundedIcon sx={{ color: "#bfdbfe" }} />,
        },
        {
          title: isAdminAuth ? "Role-protected entry" : "Protected customer access",
          description: isAdminAuth
            ? "Non-admin accounts are blocked from this login path even if they know the credentials format."
            : "Session-backed access keeps account actions and booking records tied to the right user.",
          icon: <VerifiedUserRoundedIcon sx={{ color: "#bfdbfe" }} />,
        },
        {
          title: isAdminAuth ? "Focused daily operations" : "Faster daily follow-up",
          description: isAdminAuth
            ? "Get straight back to the admin dashboard without exposing operational pages to normal users."
            : "Get back to your service schedule quickly with a focused auth flow built for repeat use.",
          icon: <QueryBuilderRoundedIcon sx={{ color: "#bfdbfe" }} />,
        },
      ]}
    >
      <Stack spacing={2}>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineRoundedIcon sx={{ color: "#64748b" }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlineRoundedIcon sx={{ color: "#64748b" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <VisibilityOffRoundedIcon /> : <RemoveRedEyeRoundedIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 1,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
            boxShadow: "0 16px 32px rgba(29, 78, 216, 0.28)",
          }}
          onClick={handleLogin}
        >
          Sign In
        </Button>

        <Divider sx={{ my: 0.5, color: "#94a3b8", fontSize: 12 }}>or</Divider>

        <Typography sx={{ color: "#475569", textAlign: "center", fontSize: 14.5 }}>
          {isAdminAuth ? "Need an admin account?" : "New here? "}
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => navigate(isAdminAuth ? "/admin/register" : "/register")}
            sx={{ fontWeight: 700, color: "#1d4ed8" }}
          >
            {isAdminAuth ? "Register as admin" : "Create your account"}
          </Link>
        </Typography>
      </Stack>
    </AuthShell>
  );
};

export default Login;
