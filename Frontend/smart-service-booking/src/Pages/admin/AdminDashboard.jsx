import {
  Alert,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import PageWrapper from "../../components/PageWrapper";
import { Fragment, useEffect, useState } from "react";
import api from "../../services/api";

import AnimatedPage from "../../components/AnimatedPage";
import BackButton from "../../components/BackButton";
import MapPreviewCard from "../../components/MapPreviewCard";
import DirectionsButton from "../../components/DirectionsButton";
import { cancelBooking, updateBookingStatus } from "../../services/bookingsApi";
import AdminNavbar from "./AdminNavBar";
import { buildMapsUrl, formatCoordinates } from "../../utils/location";
import PageHero from "../../components/PageHero";

const CALENDAR_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const toDateInputValue = (value) => {
  const source = value ? new Date(`${value}T00:00:00`) : new Date();
  return new Date(source.getTime() - source.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

const getScheduleDate = (booking) =>
  booking.bookingDate ||
  (booking.createdAt ? new Date(booking.createdAt).toISOString().split("T")[0] : "");

const formatScheduleDate = (value, options) =>
  new Date(`${value}T00:00:00`).toLocaleDateString(undefined, options);

const getWeekDates = (value) => {
  const anchor = new Date(`${value}T00:00:00`);
  const day = anchor.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const start = new Date(anchor);
  start.setDate(anchor.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return toDateInputValue(current.toISOString().split("T")[0]);
  });
};

const buildCalendarMap = (bookings) =>
  bookings.reduce((acc, booking) => {
    const scheduleDate = getScheduleDate(booking);
    const slot = booking.slot || "";

    if (!scheduleDate || !slot) {
      return acc;
    }

    if (!acc[scheduleDate]) {
      acc[scheduleDate] = {};
    }

    if (!acc[scheduleDate][slot]) {
      acc[scheduleDate][slot] = [];
    }

    acc[scheduleDate][slot].push(booking);
    return acc;
  }, {});

const AdminDashboard = () => {
  const today = toDateInputValue();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [openCancel, setOpenCancel] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [calendarView, setCalendarView] = useState("week");
  const [calendarDate, setCalendarDate] = useState(today);
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
  const inProgressBookings = bookings.filter(
    (b) => getStatus(b.status) === "in_progress",
  ).length;
  const completedBookings = bookings.filter(
    (b) => getStatus(b.status) === "completed",
  ).length;
  const calendarDates =
    calendarView === "day" ? [calendarDate] : getWeekDates(calendarDate);
  const calendarDateSet = new Set(calendarDates);
  const visibleCalendarBookings = bookings.filter((booking) =>
    calendarDateSet.has(getScheduleDate(booking)),
  );
  const calendarMap = buildCalendarMap(visibleCalendarBookings);
  const todayBookings = bookings.filter((booking) => getScheduleDate(booking) === today).length;
  const selectedRangeBookings = visibleCalendarBookings.length;

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
      theme="aurora"
      sx={{
        pt: 6,
      }}
      maxWidth="xl"
      containerSx={{ px: { xs: 2, md: 4 } }}
    >
        <BackButton />
      <AdminNavbar sx={{ mt: 7, marginTop: "10px" }} />
      
      <AnimatedPage>
        <PageHero
          eyebrow="Admin Operations"
          title="See schedule pressure and booking status at a glance"
          description="This dashboard groups live bookings, calendar coverage, and service progress into one operational view for daily coordination."
          tone="aurora"
          stats={[
            { label: "Total Bookings", value: totalBookings },
            { label: "Pending", value: pendingBookings },
            { label: "In Progress", value: inProgressBookings },
            { label: "Completed", value: completedBookings },
          ]}
          sx={{ mt: 3 }}
        />
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
              background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(220,252,231,0.84))",
              border: "1px solid rgba(16, 185, 129, 0.14)",
              boxShadow: "none",
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
              background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(220,252,231,0.84))",
              border: "1px solid rgba(16, 185, 129, 0.14)",
              boxShadow: "none",
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
              background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(220,252,231,0.84))",
              border: "1px solid rgba(16, 185, 129, 0.14)",
              boxShadow: "none",
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
              background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(220,252,231,0.84))",
              border: "1px solid rgba(16, 185, 129, 0.14)",
              boxShadow: "none",
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

        <Box
          sx={{
            mb: 3,
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            border: "1px solid rgba(16, 185, 129, 0.16)",
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.72), rgba(220,252,231,0.8))",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              alignItems: { xs: "flex-start", md: "center" },
              flexDirection: { xs: "column", md: "row" },
              mb: 2.5,
            }}
          >
            <Box>
              <Typography sx={{ color: "#0f172a", fontWeight: 800, fontSize: 22 }}>
                Schedule Calendar
              </Typography>
              <Typography sx={{ color: "#64748b", fontSize: 14, mt: 0.4 }}>
                Track daily and weekly assignments by slot instead of scanning only cards.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>
              <Button
                variant={calendarView === "day" ? "contained" : "outlined"}
                onClick={() => setCalendarView("day")}
                sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}
              >
                Day View
              </Button>
              <Button
                variant={calendarView === "week" ? "contained" : "outlined"}
                onClick={() => setCalendarView("week")}
                sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}
              >
                Week View
              </Button>
              <TextField
                size="small"
                type="date"
                label="Anchor date"
                value={calendarDate}
                onChange={(e) => setCalendarDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                variant="outlined"
                onClick={() => setCalendarDate(today)}
                sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}
              >
                Today
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              mb: 2.5,
            }}
          >
            <Card sx={{ borderRadius: 3.5, border: "1px solid rgba(16, 185, 129, 0.14)", boxShadow: "none", background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(220,252,231,0.84))" }}>
              <CardContent>
                <Typography sx={{ color: "#64748b", fontSize: 14 }}>Scheduled Today</Typography>
                <Typography variant="h4" sx={{ color: "#0f172a", fontWeight: 800 }}>
                  {todayBookings}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: 3.5, border: "1px solid rgba(16, 185, 129, 0.14)", boxShadow: "none", background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(220,252,231,0.84))" }}>
              <CardContent>
                <Typography sx={{ color: "#64748b", fontSize: 14 }}>
                  {calendarView === "day" ? "Selected Day" : "Selected Week"}
                </Typography>
                <Typography variant="h4" sx={{ color: "#0f172a", fontWeight: 800 }}>
                  {selectedRangeBookings}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ overflowX: "auto", pb: 1 }}>
            <Box
              sx={{
                minWidth: calendarView === "day" ? 420 : 1180,
                display: "grid",
                gridTemplateColumns:
                  calendarView === "day" ? "110px minmax(260px, 1fr)" : "110px repeat(7, minmax(150px, 1fr))",
                border: "1px solid #d7dee8",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Box sx={{ p: 1.5, bgcolor: "#e2e8f0", fontWeight: 800, color: "#0f172a" }}>
                Time
              </Box>
              {calendarDates.map((date) => (
                <Box
                  key={date}
                  sx={{
                    p: 1.5,
                    bgcolor: "#e2e8f0",
                    borderLeft: "1px solid #cbd5e1",
                  }}
                >
                  <Typography sx={{ color: "#0f172a", fontWeight: 800, fontSize: 14 }}>
                    {formatScheduleDate(date, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                  <Typography sx={{ color: "#64748b", fontSize: 12 }}>{date}</Typography>
                </Box>
              ))}

              {CALENDAR_SLOTS.map((slot) => (
                <Fragment key={slot}>
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: "#f8fafc",
                      borderTop: "1px solid #e2e8f0",
                      fontWeight: 700,
                      color: "#334155",
                    }}
                  >
                    {slot}
                  </Box>
                  {calendarDates.map((date) => {
                    const cellBookings = calendarMap[date]?.[slot] || [];

                    return (
                      <Box
                        key={`${date}-${slot}`}
                        sx={{
                          minHeight: 116,
                          p: 1,
                          borderTop: "1px solid #e2e8f0",
                          borderLeft: "1px solid #e2e8f0",
                          bgcolor: cellBookings.length ? "#ffffff" : "#f8fafc",
                        }}
                      >
                        {cellBookings.length ? (
                          cellBookings.map((booking) => (
                            <Box
                              key={booking._id}
                              sx={{
                                mb: 0.8,
                                p: 1,
                                borderRadius: 2,
                                backgroundColor:
                                  getStatus(booking.status) === "completed"
                                    ? "#dcfce7"
                                    : getStatus(booking.status) === "cancelled"
                                      ? "#fee2e2"
                                      : "#dbeafe",
                                border: "1px solid rgba(15, 23, 42, 0.08)",
                              }}
                            >
                              <Typography sx={{ color: "#0f172a", fontWeight: 700, fontSize: 13 }}>
                                {booking.userName}
                              </Typography>
                              <Typography sx={{ color: "#475569", fontSize: 12.5 }}>
                                {booking.serviceTitle}
                              </Typography>
                              <Typography sx={{ color: "#1e3a8a", fontSize: 11.5, fontWeight: 700 }}>
                                {formatStatusLabel(getStatus(booking.status))}
                              </Typography>
                            </Box>
                          ))
                        ) : (
                          <Typography sx={{ color: "#94a3b8", fontSize: 12 }}>No bookings</Typography>
                        )}
                      </Box>
                    );
                  })}
                </Fragment>
              ))}
            </Box>
          </Box>
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
                  borderRadius: 4,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.84), rgba(236,253,245,0.92))",
                  border: "1px solid rgba(16, 185, 129, 0.16)",
                  boxShadow: "var(--shadow-card)",
                  transition: "0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 22px 40px rgba(52, 40, 25, 0.14)",
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
                    📅 Date: {getScheduleDate(b) ? formatScheduleDate(getScheduleDate(b), {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }) : "N/A"}
                  </Typography>
                  <Typography sx={{ color: "#475569", mb: 0.5, fontSize: 14 }}>
                    🕒 Slot: {b.slot || "N/A"}
                  </Typography>
                  <Typography sx={{ color: "#475569", mb: 0.5, fontSize: 14 }}>
                    📍 Address: {b.location?.address || "Not provided"}
                  </Typography>
                  {b.location?.notes ? (
                    <Typography sx={{ color: "#475569", mb: 0.5, fontSize: 14 }}>
                      🧭 Note: {b.location.notes}
                    </Typography>
                  ) : null}
                  {formatCoordinates(b.location) ? (
                    <Typography sx={{ color: "#475569", mb: 0.5, fontSize: 14 }}>
                      🌐 Coordinates: {formatCoordinates(b.location)}
                    </Typography>
                  ) : null}
                  {buildMapsUrl(b.location) ? (
                    <Button
                      href={buildMapsUrl(b.location)}
                      target="_blank"
                      rel="noreferrer"
                      sx={{ mt: 0.5, px: 0, textTransform: "none", fontWeight: 700 }}
                    >
                      Open map
                    </Button>
                  ) : null}
                  <DirectionsButton
                    destination={b.location}
                    sx={{ mt: 0.75, ml: 1 }}
                  />
                  <MapPreviewCard
                    title="Customer location"
                    location={b.location}
                    height={200}
                  />
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
