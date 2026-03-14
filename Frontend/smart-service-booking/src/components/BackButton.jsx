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
        backgroundColor: "rgba(255, 252, 246, 0.88)",
        mb: 1.5,
        boxShadow: "var(--shadow-card)",
        border: "1px solid rgba(124, 104, 72, 0.16)",
        color: "#173d32",
        "&:hover": { backgroundColor: "#fffaf2" },
        ...sx,
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default BackButton;
