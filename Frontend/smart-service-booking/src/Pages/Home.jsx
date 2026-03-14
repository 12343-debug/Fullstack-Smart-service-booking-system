import { Box, Button, Chip, Grid, Stack, Typography } from "@mui/material";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ScheduleIcon from "@mui/icons-material/Schedule";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HandymanIcon from "@mui/icons-material/Handyman";
import TimelineIcon from "@mui/icons-material/Timeline";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";

const services = [
  {
    title: "Cleaning",
    description: "Regular cleaning, deep cleaning, and scheduled upkeep with a quick booking flow.",
    icon: <CleaningServicesIcon sx={{ fontSize: 30 }} />,
    accent: "#0ea5e9",
    bg: "linear-gradient(135deg, rgba(14,165,233,0.14), rgba(37,99,235,0.08))",
  },
  {
    title: "Electrical",
    description: "Repairs, fittings, and inspection requests handled through one service workflow.",
    icon: <ElectricalServicesIcon sx={{ fontSize: 30 }} />,
    accent: "#7c3aed",
    bg: "linear-gradient(135deg, rgba(124,58,237,0.14), rgba(219,39,119,0.08))",
  },
  {
    title: "Plumbing",
    description: "Book plumbing support with location details, preferred date, and time slot selection.",
    icon: <PlumbingIcon sx={{ fontSize: 30 }} />,
    accent: "#0f766e",
    bg: "linear-gradient(135deg, rgba(20,184,166,0.14), rgba(15,118,110,0.08))",
  },
];

const benefits = [
  {
    title: "Simple booking",
    description: "Customers can register, choose a service, select a slot, and confirm with minimal steps.",
    icon: <ScheduleIcon sx={{ color: "#2563eb" }} />,
    stat: "3 steps",
  },
  {
    title: "Reliable flow",
    description: "Structured booking details and protected access make the service process clearer.",
    icon: <VerifiedUserIcon sx={{ color: "#2563eb" }} />,
    stat: "Protected",
  },
  {
    title: "Admin control",
    description: "Admins can manage bookings, service listings, and progress updates from one dashboard.",
    icon: <SupportAgentIcon sx={{ color: "#2563eb" }} />,
    stat: "Real-time",
  },
];

const steps = [
  {
    id: "01",
    title: "Login or register",
    description: "Create access to browse services and manage your bookings.",
    icon: <HowToRegIcon sx={{ fontSize: 24 }} />,
  },
  {
    id: "02",
    title: "Choose and book",
    description: "Pick the service, add location details, and select a suitable date and slot.",
    icon: <HandymanIcon sx={{ fontSize: 24 }} />,
  },
  {
    id: "03",
    title: "Track progress",
    description: "Follow updates while admins manage the booking lifecycle behind the scenes.",
    icon: <TimelineIcon sx={{ fontSize: 24 }} />,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper
      theme="ocean"
      containerSx={{ px: { xs: 2, md: 4 } }}
      sx={{ pt: { xs: 8, md: 10 } }}
    >
      <AnimatedPage>
        <Stack spacing={{ xs: 5, md: 7 }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" className="reveal delay-1">
            <Grid item xs={12} lg={7}>
              <Chip
                label="Smart Service Booking"
                sx={{
                  mb: 2,
                  fontWeight: 800,
                  color: "#1d4ed8",
                  backgroundColor: "rgba(219,234,254,0.9)",
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 38, md: 64 },
                  lineHeight: 0.96,
                  color: "#0f172a",
                  maxWidth: 760,
                }}
              >
                Home services made easy to book and easier to manage.
              </Typography>
              <Typography
                sx={{
                  mt: 2.2,
                  maxWidth: 640,
                  fontSize: { xs: 16, md: 19 },
                  lineHeight: 1.8,
                  color: "#475569",
                }}
              >
                This platform is meant for booking household services like cleaning,
                electrical work, and plumbing, while also giving admins a clean way
                to manage bookings, services, and schedule updates.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3.2 }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowOutwardIcon />}
                  sx={{
                    borderRadius: 999,
                    px: 3.5,
                    py: 1.35,
                    background: "linear-gradient(135deg, #0f172a, #2563eb)",
                    boxShadow: "0 14px 28px rgba(37, 99, 235, 0.22)",
                  }}
                  onClick={() => navigate("/services")}
                >
                  Explore Services
                </Button>
                <Button
                  variant="text"
                  size="large"
                  sx={{
                    borderRadius: 999,
                    px: 2,
                    py: 1.35,
                    color: "#0c4a6e",
                    fontWeight: 700,
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} lg={5}>
              <Box
                sx={{
                  position: "relative",
                  minHeight: { xs: 320, md: 420 },
                  borderRadius: 8,
                  overflow: "hidden",
                  background:
                    "linear-gradient(160deg, rgba(15,23,42,0.96), rgba(37,99,235,0.9) 58%, rgba(14,165,233,0.86) 100%)",
                  boxShadow: "0 28px 60px rgba(37, 99, 235, 0.16)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at 22% 24%, rgba(255,255,255,0.18), transparent 18%), radial-gradient(circle at 82% 26%, rgba(255,255,255,0.12), transparent 18%), radial-gradient(circle at 65% 78%, rgba(255,255,255,0.12), transparent 18%)",
                  }}
                />
                <Box sx={{ position: "relative", zIndex: 1, p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.72)", fontSize: 12, letterSpacing: 1.1 }}>
                    PLATFORM OVERVIEW
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1, color: "#fff", fontWeight: 800, maxWidth: 320 }}>
                    One place for customer booking and admin operations.
                  </Typography>

                  <Stack spacing={1.8} sx={{ mt: 4 }}>
                    {["Book services online", "Track service progress", "Manage bookings from admin dashboard"].map((item) => (
                      <Box
                        key={item}
                        sx={{
                          py: 1.2,
                          borderBottom: "1px solid rgba(255,255,255,0.16)",
                        }}
                      >
                        <Typography sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box
            className="reveal delay-2"
            sx={{
              borderRadius: 7,
              overflow: "hidden",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(239,246,255,0.82) 48%, rgba(224,231,255,0.84) 100%)",
              border: "1px solid rgba(148, 163, 184, 0.18)",
              boxShadow: "0 24px 54px rgba(37, 99, 235, 0.08)",
            }}
          >
            <Grid container>
              <Grid item xs={12} lg={4}>
                <Box
                  sx={{
                    height: "100%",
                    p: { xs: 3, md: 4 },
                    background:
                      "linear-gradient(160deg, rgba(15,23,42,0.96), rgba(30,64,175,0.92) 58%, rgba(14,165,233,0.82) 100%)",
                    color: "#fff",
                  }}
                >
                  <Typography sx={{ fontSize: 12, letterSpacing: 1.1, opacity: 0.74 }}>
                    WHY TEAMS CHOOSE IT
                  </Typography>
                  <Typography variant="h3" sx={{ mt: 1.2, fontSize: { xs: 30, md: 38 }, lineHeight: 1.05 }}>
                    Why this platform works
                  </Typography>
                  <Typography sx={{ mt: 1.8, color: "rgba(255,255,255,0.8)", lineHeight: 1.8 }}>
                    The product combines a smooth customer booking experience with operational
                    clarity for admins, which makes the whole service workflow easier to run.
                  </Typography>

                  <Stack direction="row" spacing={1.2} sx={{ mt: 3, flexWrap: "wrap" }}>
                    {["Customer ready", "Admin managed", "Service focused"].map((label) => (
                      <Chip
                        key={label}
                        label={label}
                        sx={{
                          color: "#eff6ff",
                          backgroundColor: "rgba(255,255,255,0.12)",
                          border: "1px solid rgba(255,255,255,0.16)",
                          fontWeight: 700,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              </Grid>

              <Grid item xs={12} lg={8}>
                <Grid container spacing={0}>
                  {benefits.map((item, index) => (
                    <Grid item xs={12} md={4} key={item.title}>
                      <Box
                        sx={{
                          height: "100%",
                          p: { xs: 3, md: 3.5 },
                          borderLeft: {
                            xs: "none",
                            md: index === 0 ? "1px solid rgba(148, 163, 184, 0.14)" : "1px solid rgba(148, 163, 184, 0.14)",
                          },
                          borderTop: {
                            xs: index === 0 ? "none" : "1px solid rgba(148, 163, 184, 0.14)",
                            md: "none",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 52,
                            height: 52,
                            borderRadius: 3,
                            display: "grid",
                            placeItems: "center",
                            background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(14,165,233,0.12))",
                            mb: 2,
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography sx={{ color: "#2563eb", fontWeight: 800, fontSize: 12, letterSpacing: 0.9, textTransform: "uppercase" }}>
                          {item.stat}
                        </Typography>
                        <Typography sx={{ mt: 0.9, color: "#0f172a", fontWeight: 800, fontSize: 21 }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ mt: 1.1, color: "#64748b", lineHeight: 1.8 }}>
                          {item.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>

          <Stack spacing={2.5} className="reveal delay-3">
            <Box>
              <Typography variant="h3" sx={{ color: "#0f172a", fontSize: { xs: 28, md: 38 } }}>
                Popular services
              </Typography>
              <Typography sx={{ mt: 1, color: "#64748b", maxWidth: 620, lineHeight: 1.8 }}>
                Core service categories are presented in a simple, readable way so the page
                feels lighter and easier to scan.
              </Typography>
            </Box>

            <Stack spacing={2}>
              {services.map((service) => (
                <Box
                  key={service.title}
                  sx={{
                    p: { xs: 2.2, md: 2.8 },
                    borderRadius: 5,
                    background: service.bg,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "170px 1fr auto" },
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, color: service.accent }}>
                    {service.icon}
                    <Typography sx={{ color: "#0f172a", fontWeight: 800, fontSize: 24 }}>
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: "#475569", lineHeight: 1.8 }}>
                    {service.description}
                  </Typography>
                  <Button
                    onClick={() => navigate("/services")}
                    sx={{
                      justifySelf: { xs: "flex-start", md: "flex-end" },
                      color: service.accent,
                      fontWeight: 700,
                      px: 0,
                    }}
                  >
                    View service
                  </Button>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="start" className="reveal delay-4">
            <Grid item xs={12} md={4}>
              <Typography variant="h3" sx={{ color: "#0f172a", fontSize: { xs: 28, md: 38 } }}>
                How it works
              </Typography>
              <Typography sx={{ mt: 1, color: "#64748b", lineHeight: 1.8 }}>
                A short, clear flow for users with enough structure for admin management.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={2.4}>
                {steps.map((step) => (
                  <Box
                    key={step.id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "76px 1fr" },
                      gap: 2,
                      alignItems: "start",
                    }}
                  >
                    <Box
                      sx={{
                        width: 58,
                        height: 58,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        color: "#fff",
                        background: "linear-gradient(135deg, #4338ca, #2563eb)",
                        boxShadow: "0 10px 22px rgba(79,70,229,0.2)",
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                      <Typography sx={{ color: "#4338ca", fontWeight: 800, fontSize: 13 }}>
                        STEP {step.id}
                      </Typography>
                      <Typography sx={{ mt: 0.5, color: "#0f172a", fontWeight: 800, fontSize: 22 }}>
                        {step.title}
                      </Typography>
                      <Typography sx={{ mt: 0.8, color: "#64748b", lineHeight: 1.8 }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default Home;
