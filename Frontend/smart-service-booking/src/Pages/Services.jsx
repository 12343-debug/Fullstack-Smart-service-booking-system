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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";
import api from "../services/api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");

  const navigate = useNavigate();

  // available slots
  const loadSlots = async () => {
    const res = await api.get("/available-slots");
    setSlots(res.data);
  };
  useEffect(() => {
    loadServices();
    loadSlots();
  }, []);

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
    if (!selectedSlot) {
  setError("Please select a time slot");
  return;
}

    if (!phoneRegex.test(phone)) {
      setError("Enter valid 10 digit phone number");
      return;
    }
    setError("");

    if (!otpVerified) {
      setError("Please verify phone number first");
      return;
    }

    await createBooking(title, name, phone,selectedSlot);

    alert("Booking Successfully");

    setName("");
  setPhone("");
  setSelectedSlot("");
  setOtp("");
  setOtpSent(false);
  setOtpVerified(false);
  };

  // otp
  const sendOTP = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone)) {
      setError("Enter valid phone number");
      return;
    }

    await api.post("/send-otp", { phone });

    setOtpSent(true);

    alert("OTP sent. Check backend console.");
  };

  //verify otp
  const verifyOTP = async () => {
    const res = await api.post("/verify-otp", {
      phone,
      otp,
    });

    if (res.data.verified) {
      setOtpVerified(true);
      alert("Phone verified successfully");
    }
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
        sx={{
          pt: 6,
          "& .MuiContainer-root": {
            maxWidth: "100% !important",
            px: { xs: 2, md: 4 },
          },
        }}
      >
        <AnimatedPage>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              mb: 1,
              "&:hover": { backgroundColor: "#ffffff" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ color: "#0f172a", fontWeight: 700 }}
          >
            Available services
          </Typography>
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              border: "1px solid #d7dee8",
              backgroundColor: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 12px 35px rgba(15, 23, 42, 0.08)",
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
              <Button
                onClick={sendOTP}
                variant="outlined"
                sx={{
                  height: 40,
                  borderColor: "#1e3a8a",
                  color: "#1e3a8a",
                  fontWeight: 600,
                  "&:hover": { borderColor: "#1e3a8a", backgroundColor: "#eff6ff" },
                }}
              >
                Send OTP
              </Button>
              {otpSent && (
                <TextField
                  size="small"
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={{ minWidth: { xs: "100%", sm: 160 } }}
                />
              )}
              {otpSent && (
                <Button
                  onClick={verifyOTP}
                  variant="contained"
                  sx={{
                    height: 40,
                    fontWeight: 700,
                    backgroundColor: "#0f172a",
                    "&:hover": { backgroundColor: "#020617" },
                  }}
                >
                  Verify OTP
                </Button>
              )}
            </Box>

            {error && (
              <Typography sx={{ color: "#c62828", mt: 1.5, textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </Box>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {services.map((service) => (
              <Grid item xs={12} md={4} key={service._id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 12px 25px rgba(15, 23, 42, 0.10)",
                    border: "1px solid #d7dee8",
                    height: "100%",
                    backgroundColor: "#ffffff",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 16px 30px rgba(15, 23, 42, 0.14)",
                    },
                  }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "130px",
                      objectFit: "contain",
                      padding: "14px",
                      textAlign: "center",
                    }}
                  />

                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#18314b", fontWeight: 600 }}>
                      {service.icon} {service.title}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        fontWeight: 700,
                        textTransform: "none",
                        backgroundColor: "#0f172a",
                        "&:hover": { backgroundColor: "#020617" },
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
