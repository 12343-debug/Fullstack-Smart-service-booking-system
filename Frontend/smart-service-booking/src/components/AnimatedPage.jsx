import { Box } from "@mui/material";

const AnimatedPage = ({ children }) => {
  return (
    <Box
      sx={{
        animation: "fadeSlide 0.5s ease-in-out",
        "@keyframes fadeSlide": {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AnimatedPage;
