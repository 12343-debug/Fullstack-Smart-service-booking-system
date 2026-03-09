import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

import {
  getBookings,
  updateBookingStatus,
  updateBookingDetails,
  cancelBooking,
  rescheduleBooking,
} from "../services/bookingsApi";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import toast from "react-hot-toast";
import { Skeleton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import PageWrapper from "../components/PageWrapper";
import api from "../services/api";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  // edit
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  // popup
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [openReschedule, setOpenReschedule] = useState(false);
  const [rescheduleId, setRescheduleId] = useState(null);
  const [rescheduleSlot, setRescheduleSlot] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [slots, setSlots] = useState([]);
  // spinner
  const [loading, setLoading] = useState(false);
  // error msg
  const [error, setError] = useState("");

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const statusOptions = ["pending", "confirmed", "in_progress", "completed", "cancelled"];
  const statusFlow = ["pending", "confirmed", "in_progress", "completed"];
  const formatStatusLabel = (status) =>
    (status || "pending")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  const getStatus = (status) => (status || "pending").toLowerCase();
  const getStatusIndex = (status) => statusFlow.indexOf(getStatus(status));

  useEffect(() => {
    loadBookings();
    loadSlots();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filter, search, sort]);

  // booking statistic dashboard
  const totalCount = bookings.length;

  const pendingCount = bookings.filter((b) => getStatus(b.status) === "pending").length;
  const completedCount = bookings.filter((b) => getStatus(b.status) === "completed").length;

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.log(error);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const loadSlots = async () => {
    try {
      const res = await api.get("/available-slots");
      setSlots(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBookings = bookings
    .filter((b) =>
      filter === "all"
        ? true
        : getStatus(b.status) === filter,
    )
    .filter(
      (b) =>
        b.userName?.toLowerCase().includes(search.toLowerCase()) ||
        b.Phone?.includes(search),
    );

  const finalBookings = [...filteredBookings].sort((a, b) => {
    if (sort === "newest") {
      return b._id.localeCompare(a._id);
    }
    if (sort === "oldest") {
      return a._id.localeCompare(b._id);
    }
    if (sort === "nameASC") {
      return a.userName.localeCompare(b.userName);
    }
    if (sort === "nameDSC") {
      return b.userName.localeCompare(a.userName);
    }
    return 0;
  });

  // pagination
  const lastIndex = page * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const paginatedBookings = finalBookings.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(finalBookings.length / itemsPerPage);

  // const handleDelete = async (id) => {
  //   await deleteBooking(id);
  //   loadBookings();
  // };
  const handleComplete = async (id) => {
    try {
      await updateBookingStatus(id, "completed");
      toast.success("Marked as Completed");
      loadBookings();
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  // edit
  const handleEdit = (b) => {
    setEditId(b._id);
    setEditName(b.userName);
    setEditPhone(b.Phone);
  };
  // save
  const handleSave = async (id) => {
    try {
      await updateBookingDetails(id, editName, editPhone);
      toast.success("Bookings Updated");
      setEditId(null);
      loadBookings();
    } catch (error) {
      toast.error("Update failed");
    }
  };
  // cancel
  const handleCancel = async () => {
    setEditId(null);
  };

  // popup
  const confirmDelete = async () => {
    try {
      await cancelBooking(deleteId, cancelReason);
      toast.success("Booking cancelled successfully");
      setOpenDelete(false);
      setDeleteId(null);
      setCancelReason("");
      loadBookings();
      loadSlots();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel booking");
    }
  };

  const confirmReschedule = async () => {
    try {
      if (!rescheduleSlot) {
        toast.error("Please select a slot");
        return;
      }
      await rescheduleBooking(rescheduleId, rescheduleSlot, rescheduleReason);
      toast.success("Booking rescheduled successfully");
      setOpenReschedule(false);
      setRescheduleId(null);
      setRescheduleSlot("");
      setRescheduleReason("");
      loadBookings();
      loadSlots();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reschedule booking");
    }
  };

  // skeleton
  const skeletonCard = () => {
    return (
      <Card sx={{ p: 2, borderRadius: 3 }}>
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="rectangular" height={40} sx={{ mt: 2 }} />
      </Card>
    );
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
        <AnimatedPage>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              backgroundColor: "rgba(255,255,255,0.85)",
              mb: 1,
              "&:hover": { backgroundColor: "#fff" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{ color: "#0f172a", fontWeight: 700 }}
          >
            My Bookings
          </Typography>
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              mb: 3,
              borderRadius: 3,
              border: "1px solid #d7dee8",
              backgroundColor: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 12px 35px rgba(15, 23, 42, 0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            <Card
              sx={{
                p: 2,
                minWidth: 150,
                textAlign: "center",
                backgroundColor: "#ffffff",
                border: "1px solid #d7dee8",
                boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
              }}
            >
              <Typography sx={{ color: "#64748b", fontSize: 14 }}>Total</Typography>
              <Typography variant="h5" sx={{ color: "#0f172a", fontWeight: 700 }}>
                {totalCount}
              </Typography>
            </Card>
            <Card
              sx={{
                p: 2,
                minWidth: 150,
                textAlign: "center",
                backgroundColor: "#ffffff",
                border: "1px solid #d7dee8",
                boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
              }}
            >
              <Typography sx={{ color: "#64748b", fontSize: 14 }}>Pending</Typography>
              <Typography variant="h5" sx={{ color: "#0f172a", fontWeight: 700 }}>
                {pendingCount}
              </Typography>
            </Card>
            <Card
              sx={{
                p: 2,
                minWidth: 150,
                textAlign: "center",
                backgroundColor: "#ffffff",
                border: "1px solid #d7dee8",
                boxShadow: "0 8px 18px rgba(15, 23, 42, 0.08)",
              }}
            >
              <Typography sx={{ color: "#64748b", fontSize: 14 }}>Completed</Typography>
              <Typography variant="h5" sx={{ color: "#0f172a", fontWeight: 700 }}>
                {completedCount}
              </Typography>
            </Card>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "center",
                justifyContent: "center",
                mb: 2.5,
                flexWrap: "wrap",
              }}
            >
            <TextField
              size="small"
              label="Search by name or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: { xs: "100%", sm: 320 }, backgroundColor: "#fff" }}
            />
            <Button
              onClick={loadBookings}
              variant="contained"
              sx={{
                height: 40,
                fontWeight: 700,
                textTransform: "none",
                backgroundColor: "#0f172a",
                "&:hover": { backgroundColor: "#020617" },
              }}
            >
              Refresh
            </Button>
            </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              flexWrap: "wrap",
              mb: 2,
            }}
          >
            <Button
              variant={filter === "all" ? "contained" : "outlined"}
              onClick={() => setFilter("all")}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 2,
                ...(filter === "all" && {
                  backgroundColor: "#0f172a",
                  "&:hover": { backgroundColor: "#020617" },
                }),
              }}
            >
              All
            </Button>
            {statusOptions.map((status) => (
              <Button
                key={status}
                variant={filter === status ? "contained" : "outlined"}
                onClick={() => setFilter(status)}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                  ...(filter === status && {
                    backgroundColor: "#0f172a",
                    "&:hover": { backgroundColor: "#020617" },
                  }),
                }}
              >
                {formatStatusLabel(status)}
              </Button>
            ))}
            </Box>

          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Button onClick={() => setSort("newest")} sx={{ textTransform: "none", fontWeight: 600 }}>
              Newest
            </Button>
            <Button onClick={() => setSort("oldest")} sx={{ textTransform: "none", fontWeight: 600 }}>
              Oldest
            </Button>
            <Button onClick={() => setSort("nameASC")} sx={{ textTransform: "none", fontWeight: 600 }}>
              Name ASC
            </Button>
            <Button onClick={() => setSort("nameDSC")} sx={{ textTransform: "none", fontWeight: 600 }}>
              Name DSC
            </Button>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              Prev
            </Button>
            <Typography sx={{ color: "#334e68", fontSize: 15 }}>
              Page {page} of {totalPages || 1}
            </Typography>
            <Button
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Box>
          </Box>
          {!loading && error && (
            <Typography
              align="center"
              color="error"
              sx={{ mt: 4, fontSize: 20, fontWeight: 600 }}
            >
              ⚠️ {error}
            </Typography>
          )}

          {loading && (
            <Grid container spacing={2.5}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid item xs={12} key={i}>
                  {skeletonCard()}
                </Grid>
              ))}
            </Grid>
          )}
          {!loading &&
            (paginatedBookings.length === 0 ? (
              <Typography
                align="center"
                sx={{ gridColumn: "1/-1", mt: 5, fontSize: 24, color: "#334e68" }}
              >
                No bookings found
              </Typography>
            ) : (
              <Grid container spacing={2.5}>
                {paginatedBookings.map((b) => (
                  <Grid item xs={12} key={b._id}>
                    <Card
                      sx={{
                        height: "100%",
                        p: 2,
                        borderRadius: 3.5,
                        backgroundColor: "#ffffff",
                        border: "1px solid #d7dee8",
                        boxShadow: "0 12px 26px rgba(15, 23, 42, 0.10)",
                        transition: "0.25s",
                        "&:hover": {
                          boxShadow: "0 16px 32px rgba(15, 23, 42, 0.14)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                    <CardContent sx={{ textAlign: "left", p: "8px !important" }}>
                      {editId === b._id ? (
                        <>
                          <TextField
                            size="small"
                            fullWidth
                            label="Name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            sx={{ mb: 1 }}
                          />

                          <TextField
                            size="small"
                            fullWidth
                            label="Phone"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              mt: 1.25,
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleSave(b._id)}
                              sx={{ textTransform: "none" }}
                            >
                              Save
                            </Button>

                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={handleCancel}
                              sx={{ textTransform: "none" }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, color: "#0f172a", mb: 0.8, fontSize: 20 }}
                          >
                            👤 Name: {b.userName}
                          </Typography>

                          <Typography
                            variant="body1"
                            sx={{ color: "#1e293b", mb: 0.6, fontSize: 16 }}
                          >
                            📞 Phone: {b.Phone}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#475569", mb: 0.6, fontSize: 15 }}
                          >
                            📅 Date:{" "}
                            {b.createdAt
                              ? new Date(b.createdAt).toLocaleDateString()
                              : "N/A"}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#475569", mb: 0.6, fontSize: 15 }}
                          >
                            🕒 Slot: {b.slot}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{ color: "#475569", mb: 1, fontSize: 15 }}
                          >
                            ⏰ Time:{" "}
                            {b.createdAt
                              ? new Date(b.createdAt).toLocaleTimeString()
                              : "N/A"}
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

                          <Button
                            variant="outlined"
                            onClick={() => handleEdit(b)}
                            sx={{ mt: 1, textTransform: "none", fontWeight: 600 }}
                          >
                            Edit
                          </Button>
                        </>
                      )}

                      <Typography
                        variant="subtitle2"
                        sx={{
                          mt: 1.7,
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

                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          mt: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: 2,
                          }}
                          disabled={getStatus(b.status) === "completed" || getStatus(b.status) === "cancelled"}
                          onClick={() => {
                            setRescheduleId(b._id);
                            setRescheduleSlot("");
                            setRescheduleReason("");
                            setOpenReschedule(true);
                          }}
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<CheckCircleIcon />}
                          sx={{
                            flex: 1,
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
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => {
                            setDeleteId(b._id);
                            setOpenDelete(true);
                          }}
                          sx={{ textTransform: "none", borderRadius: 2 }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                  </Grid>
                ))}
              </Grid>
            ))}

          <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <DialogTitle>Confirm Cancel</DialogTitle>
            <DialogContent>
              <Typography sx={{ mb: 1 }}>
                Are you sure you want to cancel this booking?
              </Typography>
              <TextField
                fullWidth
                size="small"
                label="Reason (optional)"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
              <Button color="error" onClick={confirmDelete}>
                Confirm Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openReschedule} onClose={() => setOpenReschedule(false)} fullWidth maxWidth="xs">
            <DialogTitle>Reschedule Booking</DialogTitle>
            <DialogContent>
              <TextField
                select
                fullWidth
                size="small"
                label="Select slot"
                value={rescheduleSlot}
                onChange={(e) => setRescheduleSlot(e.target.value)}
                sx={{ mt: 1 }}
              >
                {slots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                size="small"
                label="Reason (optional)"
                value={rescheduleReason}
                onChange={(e) => setRescheduleReason(e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenReschedule(false)}>Close</Button>
              <Button variant="contained" onClick={confirmReschedule}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </AnimatedPage>
      </PageWrapper>
    </Box>
  );
};

export default Bookings;
