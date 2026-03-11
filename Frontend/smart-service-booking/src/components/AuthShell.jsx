import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import BackButton from "./BackButton";
import AnimatedPage from "./AnimatedPage";
import PageWrapper from "./PageWrapper";

const AuthShell = ({
  badge,
  formTitle,
  formSubtitle,
  sideEyebrow,
  sideTitle,
  sideDescription,
  sidePoints = [],
  children,
}) => {
  return (
    <PageWrapper
      sx={{
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
        background:
          "radial-gradient(circle at top left, rgba(29, 78, 216, 0.16), transparent 28%), linear-gradient(145deg, #eff5ff 0%, #f8fbff 45%, #eef2f7 100%)",
      }}
    >
      <AnimatedPage>
        <BackButton />
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: { xs: 4, md: 6 },
            border: "1px solid rgba(148, 163, 184, 0.25)",
            backgroundColor: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(18px)",
            boxShadow: "0 28px 80px rgba(15, 23, 42, 0.12)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 15% 20%, rgba(96, 165, 250, 0.18), transparent 20%), radial-gradient(circle at 85% 80%, rgba(56, 189, 248, 0.12), transparent 22%)",
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
              minHeight: { md: 680 },
            }}
          >
            <Box
              sx={{
                p: { xs: 3, sm: 4, md: 6 },
                color: "#e2e8f0",
                background:
                  "linear-gradient(160deg, #0f172a 0%, #132a4f 52%, #1d4ed8 100%)",
              }}
            >
              <Chip
                label={sideEyebrow}
                sx={{
                  mb: 3,
                  color: "#dbeafe",
                  backgroundColor: "rgba(191, 219, 254, 0.14)",
                  border: "1px solid rgba(191, 219, 254, 0.24)",
                  fontWeight: 700,
                  letterSpacing: 0.3,
                }}
              />

              <Typography
                sx={{
                  maxWidth: 520,
                  mb: 2,
                  fontSize: { xs: 30, md: 44 },
                  lineHeight: 1.05,
                  fontWeight: 800,
                  letterSpacing: -1,
                }}
              >
                {sideTitle}
              </Typography>

              <Typography
                sx={{
                  maxWidth: 520,
                  mb: 4,
                  color: "rgba(226, 232, 240, 0.8)",
                  fontSize: { xs: 15, md: 17 },
                  lineHeight: 1.7,
                }}
              >
                {sideDescription}
              </Typography>

              <Stack spacing={2.2}>
                {sidePoints.map((point) => (
                  <Paper
                    key={point.title}
                    elevation={0}
                    sx={{
                      p: 2.2,
                      display: "flex",
                      gap: 1.8,
                      alignItems: "flex-start",
                      borderRadius: 3,
                      color: "#e2e8f0",
                      backgroundColor: "rgba(15, 23, 42, 0.28)",
                      border: "1px solid rgba(191, 219, 254, 0.14)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 2.5,
                        background:
                          "linear-gradient(145deg, rgba(125, 211, 252, 0.2), rgba(96, 165, 250, 0.3))",
                      }}
                    >
                      {point.icon}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, mb: 0.4 }}>
                        {point.title}
                      </Typography>
                      <Typography sx={{ color: "rgba(226, 232, 240, 0.74)", fontSize: 14 }}>
                        {point.description}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 3, sm: 4, md: 6 },
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 480 }}>
                <Typography
                  sx={{
                    color: "#1d4ed8",
                    fontSize: 13,
                    fontWeight: 800,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    mb: 1.2,
                  }}
                >
                  {badge}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    color: "#0f172a",
                    fontSize: { xs: 28, md: 38 },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: -0.8,
                    mb: 1.4,
                  }}
                >
                  {formTitle}
                </Typography>
                <Typography
                  sx={{
                    color: "#475569",
                    fontSize: 15,
                    lineHeight: 1.7,
                    mb: 3.5,
                  }}
                >
                  {formSubtitle}
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.82)",
                    border: "1px solid rgba(148, 163, 184, 0.18)",
                    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
                  }}
                >
                  {children}
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default AuthShell;
