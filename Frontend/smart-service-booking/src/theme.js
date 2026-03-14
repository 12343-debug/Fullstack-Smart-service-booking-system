import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#14532d",
    },
    secondary: {
      main: "#0f766e",
    },
    text: {
      primary: "#10261f",
      secondary: "#4c635a",
    },
    background: {
      default: "#f4efe6",
      paper: "#fffdf8",
    },
  },
  typography: {
    fontFamily: '"Avenir Next", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: -1.4,
    },
    h2: {
      fontWeight: 800,
      letterSpacing: -1.2,
    },
    h3: {
      fontWeight: 800,
      letterSpacing: -1,
    },
    h4: {
      fontWeight: 800,
      letterSpacing: -0.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 18,
  },
});

export default theme;
