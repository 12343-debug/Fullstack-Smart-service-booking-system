import {
  Typography,
  Container,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "./Home.css";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";

const featureCardStyle = {
  height: "100%",
  textAlign: "center",
  padding: 3,
  cursor: "pointer",
  borderRadius: 3,
  transition: "all 0.3s ease",
  background: "linear-gradient(135deg, #f47ed3, #5dfcf1)",
  "&:hover": {
    transform: "translateY(-8px) scale(1.03)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    background: "linear-gradient(135deg, #2d9385, #bbdefb)",
  },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <AnimatedPage>
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            overflowX: "hidden",
            background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
            pt: 10,
            pb: 10,
          }}
        >
          {/* ================= HERO SECTION ================= */}
          <Box
            sx={{
              width: "100%",
              py: { xs: 4, md: 8 },
            }}
          >
            <Container maxWidth="xl" disableGutters>
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} md={6}>
                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 3 }}>
                    Smart Service Booking Platform
                  </Typography>

                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                  >
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
                      width: "100%",
                      maxWidth: 380,
                      margin: "0 auto",
                      animation: "float 3s ease-in-out infinite",
                      display: "block",
                    }}
                  />
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* ================= FEATURES SECTION ================= */}
          <Box sx={{ width: "100%", mt: 10 }}>
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
                    <Card className="feature-card" sx={featureCardStyle}>
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
          </Box>

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
    </PageWrapper>
  );
};

export default Home;
