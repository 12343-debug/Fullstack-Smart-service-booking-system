import {
  Alert,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import { useEffect, useState } from "react";
import api from "../../services/api";

import AnimatedPage from "../../components/AnimatedPage";
import { cancelBooking, updateBookingStatus } from "../../services/bookingsApi";
import AdminNavbar from "./AdminNavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [openCancel, setOpenCancel] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const totalBookings = bookings.length;
  const getStatus = (status) => (status || "pending").toLowerCase();
  const statusFlow = ["pending", "confirmed", "in_progress", "completed"];
  const statusOptions = ["pending", "confirmed", "in_progress", "completed", "cancelled"];
  const formatStatusLabel = (status) =>
    (status || "pending")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  const getStatusIndex = (status) => statusFlow.indexOf(getStatus(status));
  const pendingBookings = bookings.filter(
    (b) => getStatus(b.status) === "pending",
  ).length;
  const navigate = useNavigate();
  const inProgressBookings = bookings.filter(
    (b) => getStatus(b.status) === "in_progress",
  ).length;
  const completedBookings = bookings.filter(
    (b) => getStatus(b.status) === "completed",
  ).length;

  useEffect(() => {
    loadAllBookings();
  }, []);

  const loadAllBookings = async () => {
    try {
      setError("");
      const res = await api.get("/admin/bookings", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      setError("Failed to load bookings. Please try again.");
    }
  };

  const handleComplete = async (id) => {
    try {
      setError("");
      await updateBookingStatus(id, "completed");
      await loadAllBookings(); // refresh data
    } catch (err) {
      console.error("Failed to update booking status:", err);
      setError("Failed to update booking status. Please try again.");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setError("");
      await updateBookingStatus(id, status);
      await loadAllBookings();
    } catch (err) {
      console.error("Failed to update booking status:", err);
      setError("Failed to update booking status. Please try again.");
    }
  };

  const handleCancel = async () => {
    try {
      setError("");
      await cancelBooking(cancelId, cancelReason);
      setOpenCancel(false);
      setCancelId(null);
      setCancelReason("");
      await loadAllBookings();
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      setError("Failed to cancel booking. Please try again.");
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
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "rgba(255,255,255,0.9)",
            mb: 1,
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      <AdminNavbar sx={{ mt: 7, marginTop: "10px" }} />
      
      <AnimatedPage>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mt: 3,
            mb: 3,
            color: "#0f172a",
            fontWeight: 700,
            letterSpacing: 0.2,
          }}
          gutterBottom
        >
          Admin Dashboard
        </Typography>
        {error ? (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        ) : null}
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(4, 1fr)" },
            mb: 3,
          }}
        >
          <Card
            sx={{
              backgroundColor: "#ffffff",
              border: "1px solid #d7dee8",
              boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
            }}
          >
            <CardContent>
              <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                Total Bookings
              </Typography>
              <Typography variant="h4" sx={{ color: "#0f172a", fontWeight: 700 }}>
                {totalBookings}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: "#ffffff",
              border: "1px solid #d7dee8",
              boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
            }}
          >
            <CardContent>
              <Typography sx={{ color: "#64748b", fontSize: 14 }}>Pending</Typography>
              <Typography variant="h4" sx={{ color: "#0f172a", fontWeight: 700 }}>
                {pendingBookings}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: "#ffffff",
              border: "1px solid #d7dee8",
              boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
            }}
          >
            <CardContent>
              <Typography sx={{ color: "#64748b", fontSize: 14 }}>In Progress</Typography>
              <Typography variant="h4" sx={{ color: "#0f172a", fontWeight: 700 }}>
                {inProgressBookings}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: "#ffffff",
              border: "1px solid #d7dee8",
              boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
            }}
          >
            <CardContent>
              <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                Completed
              </Typography>
              <Typography variant="h4" sx={{ color: "#0f172a", fontWeight: 700 }}>
                {completedBookings}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Grid
          container
          spacing={2.5}
          sx={{ marginTop: "6px", justifyContent: "center" }}
        >
          {bookings.map((b) => (
            <Grid item xs={12} sm={6} lg={4} key={b._id}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  backgroundColor: "#ffffff",
                  border: "1px solid #d7dee8",
                  boxShadow: "0 10px 22px rgba(15, 23, 42, 0.10)",
                  transition: "0.25s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.14)",
                  },
                }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Typography sx={{ fontWeight: 700, color: "#0f172a", mb: 0.8, fontSize: 18 }}>
                    👤Name: {b.userName}
                  </Typography>
                  <Typography sx={{ color: "#334155", mb: 0.5, fontSize: 15 }}>
                    📞Phone: {b.Phone}
                  </Typography>
                  <Typography sx={{ color: "#475569", mb: 0.5, fontSize: 14 }}>
                    🛠 Service: {b.serviceTitle}
                  </Typography>
                  <Typography sx={{ color: "#475569", mb: 0.5, fontSize: 14 }}>
                    🕒 Slot: {b.slot || "N/A"}
                  </Typography>
                  {(b.rescheduledFrom || b.rescheduleReason || b.cancelReason) && (
                    <Box
                      sx={{
                        mt: 1,
                        p: 1.2,
                        borderRadius: 2,
                        border: "1px dashed #cbd5e1",
                        backgroundColor: "#f8fafc",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#1e3a8a",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.3,
                        }}
                      >
                        Booking History
                      </Typography>
                      {b.rescheduledFrom && (
                        <Typography variant="body2" sx={{ color: "#475569", mt: 0.5 }}>
                          Rescheduled: {b.rescheduledFrom} → {b.slot}
                        </Typography>
                      )}
                      {b.rescheduleReason && (
                        <Typography variant="body2" sx={{ color: "#475569", mt: 0.3 }}>
                          Reschedule Reason: {b.rescheduleReason}
                        </Typography>
                      )}
                      {b.cancelReason && (
                        <Typography variant="body2" sx={{ color: "#475569", mt: 0.3 }}>
                          Cancel Reason: {b.cancelReason}
                        </Typography>
                      )}
                      {b.cancelledBy && (
                        <Typography variant="body2" sx={{ color: "#475569", mt: 0.3 }}>
                          Cancelled By: {formatStatusLabel(b.cancelledBy)}
                        </Typography>
                      )}
                    </Box>
                  )}
                  <Typography
                    sx={{
                      mt: 1.2,
                      color: "#334155",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: 0.3,
                      textTransform: "uppercase",
                    }}
                  >
                    Status: {formatStatusLabel(getStatus(b.status)).toUpperCase()}
                  </Typography>
                  <Box
                    sx={{
                      mt: 1,
                      p: 1,
                      borderRadius: 2,
                      border: "1px solid #e2e8f0",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    {getStatus(b.status) === "cancelled" ? (
                      <Typography
                        sx={{
                          color: "#b91c1c",
                          fontWeight: 700,
                          fontSize: 12,
                          textTransform: "uppercase",
                          letterSpacing: 0.3,
                        }}
                      >
                        Booking Cancelled
                      </Typography>
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, flexWrap: "wrap" }}>
                        {statusFlow.map((step, index) => {
                          const active = index <= getStatusIndex(b.status);
                          return (
                            <Box key={step} sx={{ display: "flex", alignItems: "center", gap: 0.6 }}>
                              <Box
                                sx={{
                                  px: 0.8,
                                  py: 0.35,
                                  borderRadius: 1.2,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  color: active ? "#ffffff" : "#64748b",
                                  backgroundColor: active ? "#1e3a8a" : "#e2e8f0",
                                  textTransform: "uppercase",
                                }}
                              >
                                {formatStatusLabel(step)}
                              </Box>
                              {index < statusFlow.length - 1 && (
                                <Box
                                  sx={{
                                    width: 14,
                                    height: 2,
                                    backgroundColor: active ? "#93c5fd" : "#cbd5e1",
                                  }}
                                />
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                  <TextField
                    select
                    size="small"
                    label="Update Status"
                    value={getStatus(b.status)}
                    onChange={(e) => handleStatusChange(b._id, e.target.value)}
                    sx={{ mt: 1.4, minWidth: 200 }}
                  >
                    {statusOptions.map((status) => (
                      <MenuItem key={status} value={status}>
                        {formatStatusLabel(status)}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: 2,
                        backgroundColor: "#0f172a",
                        "&:hover": { backgroundColor: "#020617" },
                      }}
                      disabled={getStatus(b.status) === "completed" || getStatus(b.status) === "cancelled"}
                      onClick={() => handleComplete(b._id)}
                    >
                      Mark Completed
                    </Button>
                    <Button
                      sx={{ textTransform: "none", borderRadius: 2 }}
                      size="small"
                      variant="contained"
                      color="error"
                      disabled={getStatus(b.status) === "completed" || getStatus(b.status) === "cancelled"}
                      onClick={() => {
                        setCancelId(b._id);
                        setCancelReason("");
                        setOpenCancel(true);
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog open={openCancel} onClose={() => setOpenCancel(false)} fullWidth maxWidth="xs">
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              size="small"
              label="Reason (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenCancel(false)}>Close</Button>
            <Button color="error" variant="contained" onClick={handleCancel}>
              Confirm Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </AnimatedPage>
    </PageWrapper>
    </Box>
  );
};

export default AdminDashboard;
