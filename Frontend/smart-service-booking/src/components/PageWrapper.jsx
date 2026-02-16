import { Box, Container } from "@mui/material";

const PageWrapper = ({ children }) => {
  return (
    <Box sx={{ pt: 10, pb: 6, minHeight: "100vh" }}>
      <Container>{children}</Container>
    </Box>
  );
};

export default PageWrapper;
