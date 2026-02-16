import {
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
    await createBooking(title, name, phone);
    alert("Booking Successfully");
    setName("");
    setPhone("");
  };

  return (
    <PageWrapper>
      <AnimatedPage>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          Available services
        </Typography>
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
          onChange={(e) => setPhone(e.target.value)}
        />
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} md={4} key={service._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "contain",
                    padding: "10px",
                  }}
                />

                <CardContent>
                  <Typography variant="h6" align="center">
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
  );
};

export default Services;
