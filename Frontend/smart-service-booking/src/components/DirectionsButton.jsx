import { useState } from "react";
import { Button } from "@mui/material";
import { buildDirectionsUrl } from "../utils/location";

const DirectionsButton = ({ destination, sx = {}, label = "Get Directions" }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!navigator.geolocation) {
      const fallbackUrl = buildDirectionsUrl(destination);
      if (fallbackUrl) {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      }
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const directionsUrl = buildDirectionsUrl(destination, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        if (directionsUrl) {
          window.open(directionsUrl, "_blank", "noopener,noreferrer");
        }

        setLoading(false);
      },
      () => {
        const fallbackUrl = buildDirectionsUrl(destination);
        if (fallbackUrl) {
          window.open(fallbackUrl, "_blank", "noopener,noreferrer");
        }
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  if (!buildDirectionsUrl(destination)) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      disabled={loading}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        borderColor: "#0f766e",
        color: "#0f766e",
        borderRadius: 999,
        "&:hover": { borderColor: "#0f766e", backgroundColor: "#f2fbf8" },
        ...sx,
      }}
    >
      {loading ? "Locating..." : label}
    </Button>
  );
};

export default DirectionsButton;
