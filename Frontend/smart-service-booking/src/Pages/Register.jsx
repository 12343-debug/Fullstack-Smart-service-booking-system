import { useState } from "react";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(name, email, password);
      alert("Registered Successfully");
      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <PageWrapper>
      <AnimatedPage>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper elevation={6} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              align="center"
              gutterBottom
            >
              Create Account
            </Typography>
            <Typography
              variant="body2"
              align="center"
              color="text.secondary"
              mb={3}
            >
              Register to book services easily
            </Typography>
            <TextField
              label="Full name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="success"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: "bold",
                borderRadius: 2,
                backgroundColor: "#516b86",
                color: "white",
              }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <span
                style={{ color: "#1976d2", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </Typography>
          </Paper>
        </Box>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default Register;
