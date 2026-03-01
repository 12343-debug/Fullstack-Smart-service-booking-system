import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import { useEffect, useState } from "react";
import api from "../../services/api";

import AnimatedPage from "../../components/AnimatedPage";
import { updateBookingStatus } from "../../services/bookingsApi";
import AdminNavbar from "./AdminNavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const navigate = useNavigate();
  const completedBookings = bookings.filter(
    (b) => b.status === "completed",
  ).length;

  useEffect(() => {
    loadAllBookings();
  }, []);

  const loadAllBookings = async () => {
    const res = await api.get("/admin/bookings", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setBookings(res.data);
  };

  const handleComplete = async (id) => {
    await updateBookingStatus(id, "completed");
    loadAllBookings(); // refresh data
  };

  const handleDelete = async (id) => {
    await api.delete(`/bookings/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    loadAllBookings();
  };

  return (
    <PageWrapper style={{ backgroundColor: "aliceblue" }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
      <AdminNavbar sx={{ mt: 7, marginTop: "10px" }} />
      
      <AnimatedPage>
       
        
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mt: 3, fontFamily: "serif" }}
          gutterBottom
        >
          Admin Dashboard
        </Typography>
        <div style={{ display: "flex", gap: "20px" }}>
          <Card sx={{ flex: 1, backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6">Total Bookings</Typography>
              <Typography variant="h4">{totalBookings}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Typography variant="h6">Pending</Typography>
              <Typography variant="h4">{pendingBookings}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6">Completed</Typography>
              <Typography variant="h4">{completedBookings}</Typography>
            </CardContent>
          </Card>
        </div>

        <Grid
          container
          spacing={3}
          sx={{ marginTop: "22px", justifyContent: "center" }}
        >
          {bookings.map((b) => (
            <Grid item xs={12} sm={6} md={3} key={b._id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: "#f9fafb",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 10px 22px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  <Typography fontWeight="bold">
                    👤Name: {b.userName}
                  </Typography>
                  <Typography variant="body2">📞Phone: {b.Phone}</Typography>
                  <Typography variant="body2">
                    🛠 Service: {b.serviceTitle}
                  </Typography>
                  <Typography
                    mt={1}
                    fontWeight="bold"
                    color={b.status === "completed" ? "green" : "orange"}
                  >
                    Status: {b.status}
                  </Typography>
                  <Box mt={2} display="flex" gap={1}>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mt: 1 }}
                      disabled={b.status === "completed"}
                      onClick={() => handleComplete(b._id)}
                    >
                      Mark Completed
                    </Button>
                    <Button
                      sx={{ height: "35px", marginTop: "8px" }}
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(b._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default AdminDashboard;
