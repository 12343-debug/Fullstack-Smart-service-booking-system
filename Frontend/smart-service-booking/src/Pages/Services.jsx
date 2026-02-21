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

const Services = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
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
    if (!name || !phone) {
      setError("please enter name and phone number");
      return;
    }
    await createBooking(title, name, phone);
    alert("Booking Successfully");
    setName("");
    setPhone("");
  };

  return (
    <Box sx={{backgroundColor:"#ababab",minHeight:"100vh",p:2}}>
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
            style={{ padding: "8px", margin: "17px" }}
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={{ padding: "8px", margin: "17px" }}
            placeholder="Phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError("");
            }}
          />
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
   