import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid
} from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import AnimatedPage from "../../components/AnimatedPage";
import BackButton from "../../components/BackButton";
import api from "../../services/api";
import AdminNavbar from "./AdminNavBar";
import { getServiceVisual } from "../../utils/serviceVisuals";

const formatPrice = (price) =>
  Number.isFinite(Number(price)) ? `Rs. ${Number(price).toLocaleString("en-IN")}` : "Price not set";

const AdminServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/services/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    loadServices();
  };

  return (
    <PageWrapper>
      <AnimatedPage>
        <BackButton />
        <AdminNavbar />

        <Typography variant="h4" textAlign="center" mt={3} mb={4}>
          Manage Services
        </Typography>

        <Grid container spacing={3} sx={{justifyContent:"center"}}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={service._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid #d7dee8",
                  boxShadow: "0 12px 25px rgba(15, 23, 42, 0.10)",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    height: 170,
                    p: 2,
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
                    <Typography
                      sx={{
                        alignSelf: "flex-start",
                        px: 1.1,
                        py: 0.5,
                        borderRadius: 999,
                        bgcolor: "rgba(255,255,255,0.18)",
                        color: getServiceVisual(service).accent,
                        fontWeight: 800,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: 0.7,
                      }}
                    >
                      Managed Service
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 1.5 }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: 24,
                          fontWeight: 800,
                          lineHeight: 1.1,
                          textShadow: "0 8px 24px rgba(15, 23, 42, 0.2)",
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Box
                        sx={{
                          minWidth: 64,
                          height: 64,
                          borderRadius: 3,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "rgba(255,255,255,0.16)",
                          border: "1px solid rgba(255,255,255,0.24)",
                          color: "#fff",
                          fontSize: 30,
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {service.icon || "S"}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
                    {service.icon} {service.title}
                  </Typography>
                  <Typography sx={{ mt: 0.8, color: "#64748b", fontSize: 14 }}>
                    Visual theme now matches the service type automatically.
                  </Typography>
                  <Typography sx={{ mt: 1.2, color: "#0f172a", fontWeight: 700, fontSize: 15 }}>
                    {formatPrice(service.price)}
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#475569", fontSize: 14 }}>
                    Duration: {service.estimatedDuration || "Not set"}
                  </Typography>

                  <Button
                    variant="contained"
                    color="error"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
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

export default AdminServices;
