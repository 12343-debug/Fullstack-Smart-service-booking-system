import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Box, Button, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";

const DEFAULT_STATE = {
  title: "Success",
  message: "Your request was completed successfully.",
  buttonLabel: "Continue",
  redirectTo: "/home",
};

const CELEBRATION_PARTICLES = [
  { left: "8%", top: "12%", size: 16, color: "#fef08a", delay: 0.1 },
  { left: "22%", top: "76%", size: 10, color: "#bfdbfe", delay: 0.25 },
  { left: "36%", top: "18%", size: 12, color: "#fbcfe8", delay: 0.4 },
  { left: "64%", top: "15%", size: 14, color: "#fde68a", delay: 0.18 },
  { left: "78%", top: "72%", size: 18, color: "#bbf7d0", delay: 0.32 },
  { left: "90%", top: "28%", size: 10, color: "#ddd6fe", delay: 0.48 },
];

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = { ...DEFAULT_STATE, ...(location.state || {}) };

  return (
    <PageWrapper>
      <AnimatedPage>
        <Box
          sx={{
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              maxWidth: 560,
              p: { xs: 4, md: 6 },
              textAlign: "center",
              borderRadius: 6,
              color: "#fff",
              background:
                "linear-gradient(145deg, #173d32 0%, #14532d 45%, #0f766e 100%)",
              boxShadow: "0 28px 80px rgba(20, 83, 45, 0.28)",
            }}
          >
            {CELEBRATION_PARTICLES.map((particle, index) => (
              <Box
                key={`${particle.left}-${particle.top}-${index}`}
                component={motion.div}
                initial={{ opacity: 0, y: 24, scale: 0.6 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [24, -18, -52, -82],
                  x: [0, index % 2 === 0 ? 10 : -10, index % 2 === 0 ? 20 : -20],
                  rotate: [0, 25, -20, 40],
                  scale: [0.6, 1, 1, 0.8],
                }}
                transition={{
                  duration: 2.8,
                  delay: particle.delay,
                  repeat: Infinity,
                  repeatDelay: 0.6,
                  ease: "easeOut",
                }}
                sx={{
                  position: "absolute",
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  borderRadius: index % 2 === 0 ? "50%" : 1,
                  backgroundColor: particle.color,
                  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.15)",
                }}
              />
            ))}
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 140, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.75,
                ease: [0.2, 0.9, 0.25, 1],
                delay: 0.15,
              }}
              sx={{
                position: "relative",
                zIndex: 1,
                width: 112,
                height: 112,
                mx: "auto",
                mb: 3,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                bgcolor: "rgba(255, 255, 255, 0.16)",
                border: "6px solid rgba(255, 255, 255, 0.24)",
              }}
            >
              <CheckCircleRoundedIcon sx={{ fontSize: 68, color: "#fff" }} />
            </Box>

            <Typography variant="h3" fontWeight={800} sx={{ mb: 1.5 }}>
              {state.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ position: "relative", zIndex: 1, maxWidth: 420, mx: "auto", opacity: 0.95, mb: 4 }}
            >
              {state.message}
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate(state.redirectTo)}
              sx={{
                position: "relative",
                zIndex: 1,
                px: 4,
                py: 1.3,
                fontWeight: 700,
                color: "#1f6f38",
                bgcolor: "#fff",
                borderRadius: 999,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#f2fff6",
                  boxShadow: "none",
                },
              }}
            >
              {state.buttonLabel}
            </Button>
          </Paper>
        </Box>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default AuthSuccess;
