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
  const [emailError, setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Email must be valid gmail address");
      return;
    }
    setEmailError("");

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if(password.length < 6){
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
            textAlign: "-webkit-center",
          }}
        >
          <Box sx={{ width: "450px", maxWidth: 400 }}>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value.endsWith("@gmail.com")) {
                    setEmailError("");
                  }
                }}
                error={Boolean(emailError)}
                helperText={emailError}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) =>{ setPassword(e.target.value);
                  setPassword(e.target.value);
                  setEmailError("");

                }}
                error ={Boolean(passwordError)}
                helperText={passwordError}
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
        </Box>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default Register;
