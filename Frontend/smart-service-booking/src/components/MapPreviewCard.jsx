import { Box, Typography } from "@mui/material";
import { buildEmbeddedMapsUrl } from "../utils/location";

const MapPreviewCard = ({ location, title = "Map preview", height = 180, sx = {} }) => {
  const embedUrl = buildEmbeddedMapsUrl(location);

  if (!embedUrl) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 1.5,
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #d7dee8",
        backgroundColor: "#f8fafc",
        ...sx,
      }}
    >
      <Typography
        sx={{
          px: 1.25,
          py: 1,
          fontSize: 13,
          fontWeight: 700,
          color: "#0f172a",
          borderBottom: "1px solid #d7dee8",
          backgroundColor: "#ffffff",
        }}
      >
        {title}
      </Typography>
      <Box
        component="iframe"
        title={title}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sx={{
          display: "block",
          width: "100%",
          height,
          border: 0,
          backgroundColor: "#e2e8f0",
        }}
      />
    </Box>
  );
};

export default MapPreviewCard;
