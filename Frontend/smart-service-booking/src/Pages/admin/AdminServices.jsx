import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid
} from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import AnimatedPage from "../../components/AnimatedPage";
import api from "../../services/api";
import AdminNavbar from "./AdminNavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

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
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <AdminNavbar />

        <Typography variant="h4" textAlign="center" mt={3} mb={4}>
          Manage Services
        </Typography>

        <Grid container spacing={3} sx={{justifyContent:"center"}}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service._id}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6">
                    {service.icon} {service.title}
                  </Typography>

                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "contain",
                      marginTop: "10px"
                    }}
                  />

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