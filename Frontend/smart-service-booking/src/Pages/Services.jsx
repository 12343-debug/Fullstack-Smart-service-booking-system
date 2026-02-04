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

const Services = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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
    alert("Booking Succesfully");
    setName("");
    setPhone("");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available services
      </Typography>
      <input  
      
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} md={4} key={service._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{service.title}</Typography>
                <Typography color="text.secondary">ID:{service._id}</Typography>

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
    </Container>
  );
};

export default Services;

// mongodb+srv://smartServiceBooking:smartBookingApplication@smart-service-booking.lmacasr.mongodb.net/
