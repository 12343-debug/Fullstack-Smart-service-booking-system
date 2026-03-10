import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = ({ sx = {} }) => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => navigate(-1)}
      sx={{
        position: "sticky",
        top: { xs: 88, md: 96 },
        left: 0,
        zIndex: 1200,
        display: "inline-flex",
        backgroundColor: "rgba(255,255,255,0.9)",
        mb: 1.5,
        boxShadow: "0 8px 18px rgba(15, 23, 42, 0.10)",
        border: "1px solid #d7dee8",
        "&:hover": { backgroundColor: "#ffffff" },
        ...sx,
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
