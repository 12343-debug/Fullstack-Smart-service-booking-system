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
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid rgba(124, 104, 72, 0.16)",
        backgroundColor: "#faf6ef",
        ...sx,
      }}
    >
      <Typography
        sx={{
          px: 1.25,
          py: 1,
          fontSize: 13,
          fontWeight: 700,
          color: "#173d32",
          borderBottom: "1px solid #d7dee8",
          backgroundColor: "rgba(255,255,255,0.72)",
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
          backgroundColor: "#ede6da",
        }}
      />
    </Box>
  );
};

export default MapPreviewCard;
