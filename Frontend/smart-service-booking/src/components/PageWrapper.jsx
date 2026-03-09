import { Box, Container } from "@mui/material";

const PageWrapper = ({ children, sx, ...props }) => {
  return (
    <Box sx={{ pt: 10, pb: 6, minHeight: "100vh", ...sx }} {...props}>
      <Container>{children}</Container>
    </Box>
  );
};

export default PageWrapper;
