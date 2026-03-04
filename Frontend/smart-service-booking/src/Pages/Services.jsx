import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
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

  const navigate = useNavigate();

  useEffect(() => {
    loadServices();
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

    if (!phoneRegex.test(phone)) {
      setError("Enter valid 10 digit phone number");
      return;
    }
    setError("");

    if (!otpVerified) {
      setError("Please verify phone number first");
      return;
    }

    await createBooking(title, name, phone);

    alert("Booking Successfully");

    setName("");
    setPhone("");
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
        backgroundColor: "#d9d9d9",
        minHeight: "100vh",
        p: 2,
        marginTop: "auto",
      }}
    >
      <PageWrapper>
        <AnimatedPage>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Available services
          </Typography>
          <div style={{ textAlign: "center" }}>
            <input
              style={{ padding: "8px", margin: "17px",border:"revert" }}
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              style={{ padding: "8px", marginLeft: "15px" ,border:"revert"}}
              placeholder="Phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setError("");
              }}
            />
            <Button onClick={sendOTP} sx={{margin:"0px",border:"none",color:"green"}}>Send OTP</Button>
            {otpSent && (
              <>
                <input
                style={{border:"none",padding:"9px"}}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <Button onClick={verifyOTP} sx={{border:"none",margin:"23px",padding:"3px"}}>Verify OTP</Button>
              </>
            )}
            {error && (
              <Typography style={{ color: "red", marginBottom: "15px", mt: 1 }}>
                {error}
              </Typography>
            )}
          </div>
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {services.map((service) => (
              <Grid item xs={12} md={4} key={service._id}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "130px",
                      objectFit: "contain",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  />

                  <CardContent>
                    <Typography variant="h6">
                      {service.icon} {service.title}
                    </Typography>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
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
