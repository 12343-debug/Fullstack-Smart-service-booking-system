import { useState } from "react";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role); 

      alert("Login Successful");
      navigate("/services")
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: "3" }}>
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Welcome Back
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary" sx={{mb:3}}>
            Login to manage your service bookings
          </Typography>

          <TextField 
          label = "Email Address"
          type="Email"
          fullWidth
          margin="normal"
          value={email}
           onChange={(e) => setEmail(e.target.value)}
          />

          <TextField 
          label = "Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
           onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" fullWidth size="large" sx={{mt:3,py:1.3,fontWeight:"bold",borderRadius:2}}
          onClick={handleLogin}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Don’t have an account?{" "}
            <span
              style={{ color: "#667eea", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/")}
            >
              Register
            </span>
          </Typography>

        </Paper>
      </Container>
    </Box>
    // <div className="auth-box">
    //   <h2>Login</h2>

    //   <input placeholder="Email"
    //   value={email}
    //     onChange={(e)=>setEmail(e.target.value)} />

    //   <input type="password" placeholder="Password" value={password}
    //     onChange={(e)=>setPassword(e.target.value)} />

    //   <button onClick={handleLogin}>Login</button>
    // </div>
  );
};

export default Login;
