import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import { getServices } from "../services/servicesApi";
import { useEffect, useState } from "react";
import { createBooking } from "../services/bookingsApi";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";
import BackButton from "../components/BackButton";
import MapPreviewCard from "../components/MapPreviewCard";
import api from "../services/api";
import { getServiceVisual } from "../utils/serviceVisuals";
import { buildMapsUrl, formatCoordinates } from "../utils/location";
import PageHero from "../components/PageHero";

const formatPrice = (price) =>
  Number.isFinite(Number(price)) ? `Rs. ${Number(price).toLocaleString("en-IN")}` : "Price on request";

const Services = () => {
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [locationCoords, setLocationCoords] = useState({ latitude: null, longitude: null });
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlot, setSelectedSlot] = useState("");
  // available slots
  const loadSlots = async (bookingDate = selectedDate) => {
    const res = await api.get("/available-slots", {
      params: { date: bookingDate },
    });
    setSlots(res.data);
  };
  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    setSelectedSlot("");
    loadSlots(selectedDate);
  }, [selectedDate]);

  const loadServices = async () => {
    const data = await getServices();
    console.log("DATA FROM BACKEND:", data);
    setServices(data);
  };

  const handleBook = async (title) => {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!serviceAddress.trim()) {
      setError("Service address is required");
      return;
    }
    if (!selectedSlot) {
      setError("Please select a time slot");
      return;
    }
    if (!selectedDate) {
      setError("Please select a booking date");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError("Enter valid 10 digit phone number");
      return;
    }
    setError("");

    await createBooking(title, name, phone, selectedDate, selectedSlot, {
      address: serviceAddress.trim(),
      notes: locationNote.trim(),
      latitude: locationCoords.latitude,
      longitude: locationCoords.longitude,
    });

    setName("");
    setPhone("");
    setServiceAddress("");
    setLocationNote("");
    setLocationCoords({ latitude: null, longitude: null });
    setSelectedDate(today);
    setSelectedSlot("");
    loadSlots(today);

    navigate("/auth-success", {
      state: {
        title: "Booking Confirmed",
        message: `Your ${title} booking is confirmed for ${selectedDate} at ${selectedSlot}.`,
        buttonLabel: "View My Bookings",
        redirectTo: "/bookings",
      },
    });
  };

  const captureCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser");
      return;
    }

    setLocating(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocating(false);
      },
      () => {
        setLocating(false);
        setError("Unable to fetch current location. Allow location access and try again.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(140deg, #f4f7fb 0%, #eef3f8 55%, #e8eef5 100%)",
      }}
    >
      <PageWrapper
        theme="sunset"
        sx={{
          pt: 6,
        }}
        maxWidth="xl"
        containerSx={{ px: { xs: 2, md: 4 } }}
      >
        <AnimatedPage>
          <BackButton />
          <PageHero
            eyebrow="Customer Services"
            title="Choose a service and book it in one flow"
            description="Fill in your service details once, compare available options, and confirm a visit without jumping between pages."
            tone="sunset"
            stats={[
              { label: "Services Loaded", value: services.length || "0" },
              { label: "Available Slots", value: slots.length || "0" },
              { label: "Selected Date", value: selectedDate || "Today" },
            ]}
          />
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 4,
              border: "1px solid rgba(249, 115, 22, 0.16)",
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.7), rgba(255,237,213,0.78))",
              backdropFilter: "blur(10px)",
              boxShadow: "var(--shadow-soft)",
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                size="small"
                label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ minWidth: { xs: "100%", sm: 220 } }}
              />
              <TextField
                size="small"
                label="House address"
                value={serviceAddress}
                onChange={(e) => {
                  setServiceAddress(e.target.value);
                  setError("");
                }}
                sx={{ minWidth: { xs: "100%", sm: 280 } }}
              />
              <TextField
                size="small"
                label="Service date"
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setError("");
                }}
                inputProps={{ min: today }}
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: { xs: "100%", sm: 180 } }}
              />
              <TextField
                select
                size="small"
                label="Select slot"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                sx={{ minWidth: { xs: "100%", sm: 180 } }}
              >
                <MenuItem value="">Select Slot</MenuItem>
                {slots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                size="small"
                label="Phone number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                sx={{ minWidth: { xs: "100%", sm: 220 } }}
              />
              <TextField
                size="small"
                label="Location note"
                value={locationNote}
                onChange={(e) => setLocationNote(e.target.value)}
                placeholder="Landmark, floor, gate color"
                sx={{ minWidth: { xs: "100%", sm: 240 } }}
              />
              <Button
                onClick={captureCurrentLocation}
                variant="outlined"
                disabled={locating}
                sx={{
                  height: 40,
                  borderColor: "#0f766e",
                  color: "#0f766e",
                  fontWeight: 600,
                  borderRadius: 999,
                  "&:hover": { borderColor: "#0f766e", backgroundColor: "#f2fbf8" },
                }}
              >
                {locating ? "Locating..." : "Use Current Location"}
              </Button>
            </Box>

            {(serviceAddress || formatCoordinates(locationCoords)) && (
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px dashed #cbd5e1",
                  backgroundColor: "#f8fafc",
                }}
              >
                <Typography sx={{ color: "#0f172a", fontWeight: 600, fontSize: 14 }}>
                  Saved service location
                </Typography>
                {serviceAddress ? (
                  <Typography sx={{ color: "#475569", mt: 0.5, fontSize: 14 }}>
                    Address: {serviceAddress}
                  </Typography>
                ) : null}
                {locationNote ? (
                  <Typography sx={{ color: "#475569", mt: 0.5, fontSize: 14 }}>
                    Note: {locationNote}
                  </Typography>
                ) : null}
                {formatCoordinates(locationCoords) ? (
                  <Typography sx={{ color: "#475569", mt: 0.5, fontSize: 14 }}>
                    Coordinates: {formatCoordinates(locationCoords)}
                  </Typography>
                ) : null}
                {buildMapsUrl({
                  address: serviceAddress,
                  latitude: locationCoords.latitude,
                  longitude: locationCoords.longitude,
                }) ? (
                  <Button
                    href={buildMapsUrl({
                      address: serviceAddress,
                      latitude: locationCoords.latitude,
                      longitude: locationCoords.longitude,
                    })}
                    target="_blank"
                    rel="noreferrer"
                  sx={{ mt: 1, px: 0, textTransform: "none", fontWeight: 700 }}
                >
                  Open in Google Maps
                  </Button>
                ) : null}
                <MapPreviewCard
                  title="Route preview"
                  location={{
                    address: serviceAddress,
                    latitude: locationCoords.latitude,
                    longitude: locationCoords.longitude,
                  }}
                  height={220}
                />
              </Box>
            )}

            {error && (
              <Typography sx={{ color: "#c62828", mt: 1.5, textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </Box>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {services.map((service) => (
              <Grid item xs={12} md={6} lg={4} key={service._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "var(--shadow-card)",
                    border: "1px solid rgba(249, 115, 22, 0.16)",
                    height: "100%",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.84), rgba(255,244,231,0.88))",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 22px 40px rgba(52, 40, 25, 0.14)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: 180,
                      px: 2.5,
                      py: 2,
                      overflow: "hidden",
                      background: getServiceVisual(service).gradient,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: getServiceVisual(service).pattern,
                        opacity: 0.95,
                      }}
                    />
                    <Box
                      sx={{
                        position: "relative",
                        zIndex: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          alignSelf: "flex-start",
                          px: 1.25,
                          py: 0.65,
                          borderRadius: 999,
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: getServiceVisual(service).accent,
                          fontWeight: 800,
                          fontSize: 12,
                          letterSpacing: 0.7,
                          textTransform: "uppercase",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        Home Service
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 800,
                              fontSize: 28,
                              lineHeight: 1.1,
                              textShadow: "0 8px 24px rgba(15, 23, 42, 0.2)",
                            }}
                          >
                            {service.title}
                          </Typography>
                          <Typography
                            sx={{
                              mt: 0.8,
                              color: "rgba(255,255,255,0.92)",
                              fontSize: 13,
                              fontWeight: 600,
                              letterSpacing: 0.25,
                            }}
                          >
                            Fast doorstep booking and verified support.
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            minWidth: 72,
                            height: 72,
                            borderRadius: 3,
                            display: "grid",
                            placeItems: "center",
                            bgcolor: "rgba(255,255,255,0.16)",
                            border: "1px solid rgba(255,255,255,0.24)",
                            color: "#fff",
                            fontSize: 34,
                            boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {service.icon || "S"}
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#18314b", fontWeight: 600 }}>
                      {service.icon} {service.title}
                    </Typography>
                    <Box
                      sx={{
                        mt: 1.4,
                        mb: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Typography sx={{ color: "#0f172a", fontWeight: 800, fontSize: 16 }}>
                        {formatPrice(service.price)}
                      </Typography>
                      <Typography
                        sx={{
                          px: 1.2,
                          py: 0.55,
                          borderRadius: 999,
                          backgroundColor: "#ecfeff",
                          color: "#155e75",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {service.estimatedDuration || "Duration not set"}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "#64748b", fontSize: 13 }}>
                      Price and estimated service time are shown before booking.
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        fontWeight: 700,
                        textTransform: "none",
                        borderRadius: 999,
                        background: "linear-gradient(135deg, #173d32, #0f766e)",
                        boxShadow: "0 14px 26px rgba(20, 83, 45, 0.2)",
                        "&:hover": { background: "linear-gradient(135deg, #10261f, #115e59)" },
                      }}
                      onClick={() => handleBook(service.title)}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AnimatedPage>
      </PageWrapper>
    </Box>
  );
};

export default Services;
