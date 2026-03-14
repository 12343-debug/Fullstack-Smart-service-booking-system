import { Box, Container } from "@mui/material";

const wrapperThemes = {
  sunset: {
    background:
      "radial-gradient(circle at 12% 18%, rgba(249, 115, 22, 0.22), transparent 24%), radial-gradient(circle at 88% 16%, rgba(236, 72, 153, 0.18), transparent 20%), linear-gradient(180deg, #fff2e2 0%, #ffe6d7 48%, #ffe9f0 100%)",
    before: "radial-gradient(circle, rgba(251, 146, 60, 0.22), transparent 70%)",
    after: "radial-gradient(circle, rgba(236, 72, 153, 0.2), transparent 68%)",
  },
  ocean: {
    background:
      "radial-gradient(circle at 10% 18%, rgba(14, 165, 233, 0.22), transparent 26%), radial-gradient(circle at 84% 20%, rgba(99, 102, 241, 0.16), transparent 20%), linear-gradient(180deg, #eaf7ff 0%, #dff3ff 45%, #e8ecff 100%)",
    before: "radial-gradient(circle, rgba(14, 165, 233, 0.18), transparent 70%)",
    after: "radial-gradient(circle, rgba(99, 102, 241, 0.18), transparent 68%)",
  },
  aurora: {
    background:
      "radial-gradient(circle at 14% 16%, rgba(34, 197, 94, 0.18), transparent 24%), radial-gradient(circle at 86% 18%, rgba(16, 185, 129, 0.18), transparent 20%), linear-gradient(180deg, #eefbf3 0%, #e4f9ef 46%, #e8fbfb 100%)",
    before: "radial-gradient(circle, rgba(34, 197, 94, 0.18), transparent 70%)",
    after: "radial-gradient(circle, rgba(20, 184, 166, 0.18), transparent 68%)",
  },
  plum: {
    background:
      "radial-gradient(circle at 12% 18%, rgba(168, 85, 247, 0.18), transparent 24%), radial-gradient(circle at 86% 16%, rgba(236, 72, 153, 0.16), transparent 18%), linear-gradient(180deg, #f8efff 0%, #f5e9ff 46%, #ffeaf4 100%)",
    before: "radial-gradient(circle, rgba(168, 85, 247, 0.16), transparent 70%)",
    after: "radial-gradient(circle, rgba(236, 72, 153, 0.18), transparent 68%)",
  },
  earth: {
    background: "var(--page-bg)",
    before: "radial-gradient(circle, rgba(20, 83, 45, 0.12), transparent 70%)",
    after: "radial-gradient(circle, rgba(197, 138, 42, 0.14), transparent 68%)",
  },
};

const PageWrapper = ({
  children,
  sx,
  containerSx,
  maxWidth = "xl",
  disableContainer = false,
  theme = "earth",
  ...props
}) => {
  const palette = wrapperThemes[theme] || wrapperThemes.earth;
  const content = disableContainer ? (
    children
  ) : (
    <Container maxWidth={maxWidth} sx={{ position: "relative", zIndex: 1, ...containerSx }}>
      {children}
    </Container>
  );

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 10, md: 12 },
        pb: { xs: 6, md: 8 },
        minHeight: "100vh",
        background: palette.background,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "3% auto auto 2%",
          width: { xs: 180, md: 260 },
          height: { xs: 180, md: 260 },
          borderRadius: "50%",
          background: palette.before,
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          right: { xs: -70, md: -40 },
          top: { xs: 120, md: 100 },
          width: { xs: 180, md: 260 },
          height: { xs: 180, md: 260 },
          borderRadius: "38% 62% 55% 45%",
          background: palette.after,
          pointerEvents: "none",
        },
        ...sx,
      }}
      {...props}
    >
      {content}
    </Box>
  );
};

export default PageWrapper;
