import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

const PageHero = ({
  eyebrow,
  title,
  description,
  actions,
  stats = [],
  tone = "ocean",
  sx = {},
}) => {
  const tones = {
    ocean: {
      background:
        "linear-gradient(135deg, rgba(10, 132, 255, 0.18), rgba(56, 189, 248, 0.12) 35%, rgba(255, 255, 255, 0.36) 100%)",
      orb: "radial-gradient(circle, rgba(56, 189, 248, 0.34), transparent 70%)",
      chipBg: "rgba(2, 132, 199, 0.12)",
      chipColor: "#0c4a6e",
      statBg: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(224,242,254,0.72))",
    },
    sunset: {
      background:
        "linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(236, 72, 153, 0.12) 35%, rgba(255, 255, 255, 0.34) 100%)",
      orb: "radial-gradient(circle, rgba(244, 114, 182, 0.32), transparent 70%)",
      chipBg: "rgba(249, 115, 22, 0.12)",
      chipColor: "#9a3412",
      statBg: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,237,213,0.76))",
    },
    aurora: {
      background:
        "linear-gradient(135deg, rgba(34, 197, 94, 0.16), rgba(20, 184, 166, 0.14) 36%, rgba(255, 255, 255, 0.34) 100%)",
      orb: "radial-gradient(circle, rgba(52, 211, 153, 0.28), transparent 70%)",
      chipBg: "rgba(16, 185, 129, 0.12)",
      chipColor: "#065f46",
      statBg: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(220,252,231,0.76))",
    },
    plum: {
      background:
        "linear-gradient(135deg, rgba(168, 85, 247, 0.16), rgba(236, 72, 153, 0.12) 36%, rgba(255, 255, 255, 0.34) 100%)",
      orb: "radial-gradient(circle, rgba(192, 132, 252, 0.3), transparent 70%)",
      chipBg: "rgba(168, 85, 247, 0.12)",
      chipColor: "#6b21a8",
      statBg: "linear-gradient(180deg, rgba(255,255,255,0.72), rgba(243,232,255,0.78))",
    },
  };
  const palette = tones[tone] || tones.ocean;

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        mb: 3.5,
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 5,
        border: "1px solid var(--panel-border)",
        background: palette.background,
        backdropFilter: "blur(14px)",
        boxShadow: "var(--shadow-soft)",
        ...sx,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: palette.orb,
          pointerEvents: "none",
        }}
      />
      <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
        {eyebrow ? (
          <Chip
            label={eyebrow}
            sx={{
              alignSelf: "flex-start",
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: palette.chipColor,
              bgcolor: palette.chipBg,
            }}
          />
        ) : null}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ maxWidth: 760 }}>
            <Typography
              variant="h3"
              sx={{ color: "var(--ink)", fontSize: { xs: 30, md: 42 }, lineHeight: 1.05 }}
            >
              {title}
            </Typography>
            {description ? (
              <Typography sx={{ mt: 1.2, color: "var(--muted)", fontSize: { xs: 15, md: 16 } }}>
                {description}
              </Typography>
            ) : null}
          </Box>
          {actions ? <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>{actions}</Box> : null}
        </Box>
        {stats.length ? (
          <Box
            sx={{
              display: "grid",
              gap: 1.5,
              gridTemplateColumns: {
                xs: "1fr",
                sm: `repeat(${Math.min(stats.length, 2)}, minmax(0, 1fr))`,
                lg: `repeat(${Math.min(stats.length, 4)}, minmax(0, 1fr))`,
              },
            }}
          >
            {stats.map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid rgba(124, 104, 72, 0.14)",
                  background: palette.statBg,
                }}
              >
                <Typography sx={{ color: "var(--muted)", fontSize: 13 }}>{stat.label}</Typography>
                <Typography sx={{ color: "var(--ink)", fontSize: 26, fontWeight: 800 }}>
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default PageHero;
