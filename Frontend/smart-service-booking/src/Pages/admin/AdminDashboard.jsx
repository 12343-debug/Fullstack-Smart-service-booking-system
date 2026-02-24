import { Card, CardContent, Typography, Button } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import { useEffect, useState } from "react";
import api from "../../services/api";

import AnimatedPage from "../../components/AnimatedPage";
import { updateBookingStatus } from "../../services/bookingsApi";
import AdminNavbar from "./AdminNavBar";



const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
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
    <PageWrapper>
      <AnimatedPage>
        <AdminNavbar/>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
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

        {bookings.map((b) => (
          <Card key={b._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>Name: {b.userName}</Typography>
              <Typography>Phone: {b.Phone}</Typography>
              <Typography>Service: {b.serviceTitle}</Typography>
              <Typography>Status: {b.status}</Typography>
            </CardContent>
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
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </Button>
          </Card>
        ))}
      </AnimatedPage>
    </PageWrapper>
  );
};

export default AdminDashboard;
