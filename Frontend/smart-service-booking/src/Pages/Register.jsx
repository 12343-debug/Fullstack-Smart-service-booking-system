import { useState } from "react";
import { registerUser } from "../services/authApi";
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
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlineRoundedIcon from "@mui/icons-material/LockOutlineRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import AuthShell from "../components/AuthShell";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSetupKey, setAdminSetupKey] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminAuth = location.pathname.startsWith("/admin/");

  const handleRegister = async () => {
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Email must be valid gmail address");
      return;
    }
    setEmailError("");

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (password.length < 6) {
      setPasswordError("password must be at least 6 characters");
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must include a number and a special character");
      return;
    }

    setEmailError("");
    setPasswordError("");
    try {
      if (isAdminAuth && !adminSetupKey.trim()) {
        toast.error("Admin setup key is required");
        return;
      }

      await registerUser(name, email, password, {
        role: isAdminAuth ? "admin" : "user",
        adminSetupKey: isAdminAuth ? adminSetupKey.trim() : undefined,
      });
      navigate("/auth-success", {
        state: {
          title: isAdminAuth ? "Admin Registration Successful" : "Registration Successful",
          message: isAdminAuth
            ? "The admin account has been created successfully. You can now continue to admin login."
            : "Your account has been created successfully. You can now continue to login.",
          buttonLabel: isAdminAuth ? "Go To Admin Login" : "Go To Login",
          redirectTo: isAdminAuth ? "/admin/login" : "/login",
        },
      });
    } catch (error) {
      const message = error?.response?.data?.message || "Registration Failed";

      if (isAdminAuth && message === "Email already registered") {
        toast.error("This email already exists. Use a new email or promote the existing account to admin.");
        return;
      }

      if (isAdminAuth && message === "Invalid admin setup key") {
        toast.error("Admin setup key is incorrect. Check Backend/.env and restart the backend.");
        return;
      }

      toast.error(message);
    }
  };

  return (
    <AuthShell
      badge={isAdminAuth ? "Admin Registration" : "Create Account"}
      formTitle={isAdminAuth ? "Create admin access" : "Start booking in minutes"}
      formSubtitle={
        isAdminAuth
          ? "Register an admin account using the setup key so dashboard access remains limited to authorized operators."
          : "Set up your account once and keep all service requests, schedules, and updates organized in one place."
      }
      sideEyebrow={isAdminAuth ? "Admin Onboarding" : "Customer Onboarding"}
      sideTitle={
        isAdminAuth
          ? "Secure admin account creation using the current auth experience."
          : "A polished registration flow built to feel trustworthy from the first screen."
      }
      sideDescription={
        isAdminAuth
          ? "This path creates dashboard-capable accounts only when the correct admin setup key is provided by the system owner."
          : "Create your account with a clean, high-clarity form experience designed for modern service products and repeat customer use."
      }
      sidePoints={[
        {
          title: isAdminAuth ? "Protected admin provisioning" : "Verified account setup",
          description: isAdminAuth
            ? "Admin registration is guarded by a setup key so public visitors cannot create dashboard accounts."
            : "Structured validation helps keep signups clean and account access more reliable.",
          icon: <ShieldRoundedIcon sx={{ color: "#bfdbfe" }} />,
        },
        {
          title: isAdminAuth ? "Instant dashboard readiness" : "Fast path to booking",
          description: isAdminAuth
            ? "Once created, the same account can sign into the admin-only login flow and open the dashboard."
            : "Register once, then move directly into service selection and booking management.",
          icon: <BoltRoundedIcon sx={{ color: "#bfdbfe" }} />,
        },
        {
          title: isAdminAuth ? "Operational control" : "Support-ready experience",
          description: isAdminAuth
            ? "Keep service management accounts separate from normal customer users."
            : "A clearer customer profile makes follow-up, updates, and service coordination easier later.",
          icon: <SupportAgentRoundedIcon sx={{ color: "#bfdbfe" }} />,
        },
      ]}
    >
      <Stack spacing={2}>
        <TextField
          label="Full Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineRoundedIcon sx={{ color: "#64748b" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (e.target.value.endsWith("@gmail.com")) {
              setEmailError("");
            }
          }}
          error={Boolean(emailError)}
          helperText={emailError}
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
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          error={Boolean(passwordError)}
          helperText={passwordError || "Use at least 6 characters, one number, and one special character."}
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
        {isAdminAuth && (
          <TextField
            label="Admin Setup Key"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={adminSetupKey}
            onChange={(e) => setAdminSetupKey(e.target.value)}
            helperText="This key must match the backend ADMIN_SETUP_KEY value."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyRoundedIcon sx={{ color: "#64748b" }} />
                </InputAdornment>
              ),
            }}
          />
        )}
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            mt: 1,
            py: 1.5,
            borderRadius: 3,
            fontWeight: 700,
            background: "linear-gradient(135deg, #0f172a, #2563eb)",
            boxShadow: "0 16px 32px rgba(37, 99, 235, 0.24)",
          }}
          onClick={handleRegister}
        >
          {isAdminAuth ? "Create Admin Account" : "Create Account"}
        </Button>

        <Divider sx={{ my: 0.5, color: "#94a3b8", fontSize: 12 }}>or</Divider>

        <Typography sx={{ color: "#475569", textAlign: "center", fontSize: 14.5 }}>
          {isAdminAuth ? "Already have admin access?" : "Already registered? "}
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => navigate(isAdminAuth ? "/admin/login" : "/login")}
            sx={{ fontWeight: 700, color: "#1d4ed8" }}
          >
            {isAdminAuth ? "Sign in as admin" : "Sign in instead"}
          </Link>
        </Typography>
      </Stack>
    </AuthShell>
  );
};

export default Register;
