import {
  Typography,
  Container,
  Box,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import StarIcon from "@mui/icons-material/Star";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HandymanIcon from "@mui/icons-material/Handyman";
import TimelineIcon from "@mui/icons-material/Timeline";
import "./Home.css";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";
import BackButton from "../components/BackButton";

const featureCardStyle = {
  height: "100%",
  textAlign: "left",
  p: 3,
  borderRadius: 3,
  border: "1px solid #d7dee8",
  boxShadow: "0 10px 22px rgba(15, 23, 42, 0.08)",
  backgroundColor: "#ffffff",
  transition: "all 0.25s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 30px rgba(15, 23, 42, 0.14)",
  },
};

const Home = () => {
  const navigate = useNavigate();
  const services = [
    {
      title: "Home Cleaning",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80",
      icon: <CleaningServicesIcon />,
    },
    {
      title: "Electrical Repair",
      image:
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
      icon: <ElectricalServicesIcon />,
    },
    {
      title: "Plumbing Service",
      image:
        "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=900&q=80",
      icon: <PlumbingIcon />,
    },
  ];
  const stats = [
    { label: "Bookings Completed", value: "2,500+", icon: <VerifiedUserIcon /> },
    { label: "Verified Professionals", value: "350+", icon: <BuildIcon /> },
    { label: "Avg. Response Time", value: "15 mins", icon: <ScheduleIcon /> },
    { label: "Customer Rating", value: "4.8/5", icon: <StarIcon /> },
  ];
  const trustPoints = [
    {
      title: "24/7 Support Team",
      desc: "Dedicated support to resolve booking and service issues quickly.",
      icon: <SupportAgentIcon sx={{ color: "#1e3a8a" }} />,
    },
    {
      title: "Secure Booking Flow",
      desc: "OTP verification and protected routes for safer user access.",
      icon: <VerifiedUserIcon sx={{ color: "#1e3a8a" }} />,
    },
    {
      title: "On-Time Service Delivery",
      desc: "Slot-based scheduling helps teams and customers stay on plan.",
      icon: <ScheduleIcon sx={{ color: "#1e3a8a" }} />,
    },
  ];
  const flowSteps = [
    {
      id: "01",
      title: "Register / Login",
      desc: "Create your account and securely access all service categories.",
      icon: <HowToRegIcon sx={{ fontSize: 28 }} />,
    },
    {
      id: "02",
      title: "Choose & Book",
      desc: "Select a service, pick your preferred slot, and confirm booking.",
      icon: <HandymanIcon sx={{ fontSize: 28 }} />,
    },
    {
      id: "03",
      title: "Track Progress",
      desc: "Monitor booking updates and manage requests from your dashboard.",
      icon: <TimelineIcon sx={{ fontSize: 28 }} />,
    },
  ];

  return (
    <PageWrapper sx={{ pt: 7 }}>
      <AnimatedPage>
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            overflowX: "hidden",
            background:
              "linear-gradient(145deg, #f4f7fb 0%, #eef3f8 58%, #e7edf5 100%)",
            pt: { xs: 5, md: 8 },
            pb: { xs: 8, md: 10 },
          }}
        >
          <Container maxWidth="xl" sx={{ mb: 2 }}>
            <BackButton />
          </Container>
          {/* ================= HERO SECTION ================= */}
          <Container maxWidth="xl" className="reveal delay-1">
            <Box
              sx={{
                width: "100%",
                py: { xs: 2, md: 4 },
                px: { xs: 1, md: 2 },
              }}
            >
              <Grid
                container
                spacing={4}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={12} md={6}>
                  <Chip
                    label="Trusted Home Service Platform"
                    sx={{
                      mb: 2,
                      backgroundColor: "#dbeafe",
                      color: "#1e3a8a",
                      fontWeight: 700,
                    }}
                  />
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    sx={{ mb: 2.2, color: "#0f172a", fontSize: { xs: 36, md: 48 } }}
                  >
                    Smart Service Booking Platform
                  </Typography>

                  <Typography
                    variant="h6"
                    sx={{ color: "#334155", fontSize: { xs: 17, md: 20 }, mb: 4 }}
                  >
                    Book trusted home services like plumbing, electrical work,
                    cleaning, and repairs in just a few clicks.
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        textTransform: "none",
                        px: 4,
                        py: 1.2,
                        borderRadius: 2.2,
                        fontWeight: 700,
                        background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
                        boxShadow: "0 10px 22px rgba(29,78,216,0.35)",
                      }}
                      onClick={() => navigate("/services")}
                    >
                      Explore Services
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        textTransform: "none",
                        px: 4,
                        py: 1.2,
                        borderRadius: 2.2,
                        fontWeight: 700,
                        borderColor: "#1e3a8a",
                        color: "#1e3a8a",
                      }}
                      onClick={() => navigate("/bookings")}
                    >
                      View Bookings
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} textAlign="center">
                  <Box
                    sx={{
                      borderRadius: 4,
                      p: 1,
                      background: "linear-gradient(145deg, #dbeafe, #eff6ff)",
                      boxShadow: "0 18px 36px rgba(15, 23, 42, 0.12)",
                      maxWidth: 560,
                      mx: "auto",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 22px 40px rgba(15, 23, 42, 0.16)",
                      },
                    }}
                  >
                    <img
                      src="https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="home service professionals"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://cdn-icons-png.flaticon.com/512/3209/3209265.png";
                      }}
                      style={{
                        width: "100%",
                        height: "340px",
                        objectFit: "cover",
                        borderRadius: "16px",
                        display: "block",
                      }}
                    />
                    <Typography
                      sx={{
                        mt: 1.2,
                        mb: 0.4,
                        color: "#0f172a",
                        fontWeight: 700,
                        fontSize: { xs: 14, md: 16 },
                        textAlign: "center",
                      }}
                    >
                      Home Service Professionals
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>

          {/* ================= QUICK STATS ================= */}
          <Container maxWidth="xl" sx={{ mt: 5 }} className="reveal delay-2">
            <Grid container spacing={2.2}>
              {stats.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.label}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #d7dee8",
                      boxShadow: "0 10px 22px rgba(15, 23, 42, 0.08)",
                      backgroundColor: "#ffffff",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 16px 28px rgba(15, 23, 42, 0.14)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Box sx={{ color: "#1d4ed8", mb: 1 }}>{item.icon}</Box>
                      <Typography sx={{ color: "#0f172a", fontWeight: 800, fontSize: 26 }}>
                        {item.value}
                      </Typography>
                      <Typography sx={{ color: "#475569", fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* ================= SERVICES SHOWCASE ================= */}
          <Container maxWidth="xl" sx={{ mt: 4 }} className="reveal delay-3">
            <Typography
              variant="h4"
              sx={{ textAlign: "center", color: "#0f172a", fontWeight: 700 }}
              gutterBottom
            >
              Popular Services
            </Typography>
            <Typography
              sx={{ textAlign: "center", color: "#475569", maxWidth: 700, mx: "auto", mb: 4 }}
            >
              Trusted professionals available across core home service categories.
            </Typography>
            <Grid container spacing={2.2}>
              {services.map((service) => (
                <Grid item xs={12} md={4} key={service.title}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      border: "1px solid #d7dee8",
                      boxShadow: "0 12px 24px rgba(15, 23, 42, 0.10)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 18px 32px rgba(15, 23, 42, 0.16)",
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={service.image}
                      alt={service.title}
                      sx={{ width: "100%", height: 220, objectFit: "cover" }}
                    />
                    <CardContent sx={{ p: 2.2 }}>
                      <Typography
                        variant="h6"
                        sx={{ color: "#0f172a", fontWeight: 700, display: "flex", gap: 1, alignItems: "center" }}
                      >
                        {service.icon}
                        {service.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>

          {/* ================= TRUST SECTION ================= */}
          <Container maxWidth="lg" sx={{ mt: 9 }} className="reveal delay-2">
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              sx={{ color: "#0f172a", fontWeight: 700 }}
            >
              Built For Reliability
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1581091215367-59ab6dcef3d8?auto=format&fit=crop&w=1200&q=80"
                  alt="professional home service team"
                  sx={{
                    width: "100%",
                    height: 290,
                    objectFit: "cover",
                    borderRadius: 3,
                    border: "1px solid #d7dee8",
                    boxShadow: "0 12px 24px rgba(15, 23, 42, 0.10)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.02)" },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  {trustPoints.map((point) => (
                    <Grid item xs={12} key={point.title}>
                      <Card
                        sx={{
                          borderRadius: 3,
                          border: "1px solid #d7dee8",
                          boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            transform: "translateX(4px)",
                            boxShadow: "0 12px 24px rgba(15, 23, 42, 0.12)",
                          },
                        }}
                      >
                        <CardContent sx={{ display: "flex", gap: 1.2, alignItems: "flex-start" }}>
                          <Box sx={{ mt: 0.2 }}>{point.icon}</Box>
                          <Box>
                            <Typography sx={{ color: "#0f172a", fontWeight: 700 }}>
                              {point.title}
                            </Typography>
                            <Typography sx={{ color: "#475569", mt: 0.6 }}>
                              {point.desc}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>

          {/* ================= FEATURES SECTION ================= */}
          <Container maxWidth="lg" sx={{ mt: 10 }} className="reveal delay-3">
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              sx={{ color: "#0f172a", fontWeight: 700 }}
            >
              Why Choose Our Platform?
            </Typography>

              <Grid container spacing={3} sx={{ mt: 3 }}>
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
                        <Typography variant="h6" mt={2} sx={{ color: "#0f172a", fontWeight: 700 }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ color: "#475569", mt: 1 }}>
                          {item.desc}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
          </Container>

          {/* ================= HOW IT WORKS ================= */}
          <Container maxWidth="lg" sx={{ mt: 10, mb: 2 }} className="reveal delay-4">
            <Typography
              variant="h4"
              textAlign="center"
              gutterBottom
              sx={{ color: "#0f172a", fontWeight: 700 }}
            >
              How It Works
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                color: "#475569",
                maxWidth: 700,
                mx: "auto",
                mb: 3.5,
              }}
            >
              Get started in three simple steps with a booking flow designed for
              speed, clarity, and reliability.
            </Typography>

            <Grid
              container
              spacing={3}
              sx={{
                mt: 1,
                position: "relative",
              }}
            >
              {flowSteps.map((item, index) => (
                <Grid item xs={12} md={4} key={item.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #d7dee8",
                      boxShadow: "0 10px 22px rgba(15, 23, 42, 0.08)",
                      height: "100%",
                      transition: "all 0.25s ease",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 16px 30px rgba(15, 23, 42, 0.14)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3.2 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          color: "#fff",
                          mb: 1.6,
                          background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
                          boxShadow: "0 8px 18px rgba(29, 78, 216, 0.30)",
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography sx={{ color: "#1e3a8a", fontWeight: 700, fontSize: 13 }}>
                        STEP {item.id}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#0f172a", fontWeight: 700, mt: 0.4 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "#475569", mt: 1.1, lineHeight: 1.7 }}>
                        {item.desc}
                      </Typography>
                      {index < flowSteps.length - 1 && (
                        <Box
                          sx={{
                            display: { xs: "none", md: "block" },
                            position: "absolute",
                            top: "48%",
                            right: -22,
                            width: 44,
                            height: 2,
                            background:
                              "linear-gradient(90deg, #93c5fd 0%, rgba(147,197,253,0.1) 100%)",
                          }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default Home;
