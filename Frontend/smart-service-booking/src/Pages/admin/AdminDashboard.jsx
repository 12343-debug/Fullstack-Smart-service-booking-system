import { Card, CardContent, Typography } from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import { useEffect, useState } from "react";
import api from "../../services/api";

import AnimatedPage from "../../components/AnimatedPage";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadAllBookings();
  }, []);

  const loadAllBookings = async () => {
    const res = await api.get("/admin/bookings", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setBookings(res.data);
  };
  return (
    <PageWrapper>
      <AnimatedPage>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        {bookings.map((b) => (
          <Card key={b._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography>Name: {b.userName}</Typography>
              <Typography>Phone: {b.Phone}</Typography>
              <Typography>Service: {b.serviceTitle}</Typography>
              <Typography>Status: {b.status}</Typography>
            </CardContent>
          </Card>
        ))}
      </AnimatedPage>
    </PageWrapper>
  );
};

export default AdminDashboard;
