import {
  Typography,
  Container,
  Box,
  Grid,
  Button,
  Card,
  CardContent
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "./Home.css";
import AnimatedPage from "../components/AnimatedPage";

const Home = () => {
  const navigate = useNavigate();

  return (
    <AnimatedPage>
          <Box sx={{ width: "90vw", overflowX: "hidden" }}>
      
      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
                Smart Service Booking Platform
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Book trusted home services like plumbing, electrical work,
                cleaning, and repairs in just a few clicks.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{ textTransform: "none", px: 4, py: 1.2 }}
                onClick={() => navigate("/services")}
              >
                Explore Services
              </Button>
            </Grid>

            <Grid item xs={12} md={6} textAlign="center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="service illustration"
                style={{
                  width: "80%",
                  maxWidth: 420,
                  animation: "float 3s ease-in-out infinite",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= FEATURES SECTION ================= */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Why Choose Our Platform?
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {[
            {
              icon: <BuildIcon fontSize="large" color="primary" />,
              title: "Wide Range of Services",
              desc: "Plumbing, electrical, cleaning, and more at one place.",
            },
            {
              icon: <VerifiedUserIcon fontSize="large" color="primary" />,
              title: "Easy Booking",
              desc: "Simple booking flow with real-time status updates.",
            },
            {
              icon: <VerifiedUserIcon fontSize="large" color="primary" />,
              title: "Secure & Reliable",
              desc: "Authentication-based access with protected routes.",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="feature-card">
                <CardContent>
                  <Box className="feature-icon">{item.icon}</Box>
                  <Typography variant="h6" mt={2}>
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= HOW IT WORKS ================= */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          How It Works
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">1. Register / Login</Typography>
            <Typography color="text.secondary">
              Create an account to securely access services.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6">2. Book a Service</Typography>
            <Typography color="text.secondary">
              Select service, enter details, and book instantly.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6">3. Track Status</Typography>
            <Typography color="text.secondary">
              View and manage bookings from your dashboard.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </AnimatedPage>

  );
};

export default Home;
