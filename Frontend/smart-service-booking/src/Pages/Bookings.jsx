import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import {
  getBookings,
  deleteBooking,
  updateBookingStatus,
  updateBookingDetails,
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

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
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
  // spinner
  const [loading, setLoading] = useState(false);
  // error msg
  const [error, setError] = useState("");

  const itemsPerPage = 4;
  const navigate = useNavigate();

  <IconButton onClick={() => navigate(-1)}>
    <ArrowBackIcon />
  </IconButton>;

  useEffect(() => {
    loadBookings();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filter, search, sort]);

  // booking statistic dashboard
  const totalCount = bookings.length;

  const pendingCount = bookings.filter((b) => b.status === "Pending").length;
  const completedCount = bookings.filter(
    (b) => b.status === "completed",
  ).length;

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

  const filteredBookings = bookings
    .filter((b) =>
      filter === "All"
        ? true
        : b.status?.toLowerCase() === filter.toLowerCase(),
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
      await deleteBooking(deleteId);
      toast.success("Booking deleted successfully");
      setOpenDelete(false);
      setDeleteId(null);
      loadBookings();
    } catch (error) {
      toast.error("Failed to delete Bookings");
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
    <PageWrapper>
      <AnimatedPage>
        <Typography variant="h4" gutterBottom>
          My Bookings
        </Typography>
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "25px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Card sx={{ p: 2, minWidth: 150 }}>
            <Typography>Total</Typography>
            <Typography variant="h5">{totalCount}</Typography>
          </Card>
          <Card sx={{ p: 2, minWidth: 150 }}>
            <Typography>Pending</Typography>
            <Typography variant="h5" color="orange">
              {pendingCount}
            </Typography>
          </Card>
          <Card sx={{ p: 2, minWidth: 150 }}>
            <Typography>completed</Typography>
            <Typography variant="h5" color="green">
              {completedCount}
            </Typography>
          </Card>
        </div>
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="search by name or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
          />
          <Button onClick={loadBookings} variant="contained">
            Refresh
          </Button>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <Button
            variant={filter === "All" ? "contained" : "outlined"}
            onClick={() => setFilter("All")}
            sx={{ mr: 1 }}
          >
            All
          </Button>
          <Button
            variant={filter === "Pending" ? "contained" : "outlined"}
            onClick={() => setFilter("Pending")}
            sx={{ mr: 1 }}
          >
            Pending
          </Button>
          <Button
            variant={filter === "completed" ? "contained" : "outlined"}
            onClick={() => setFilter("completed")}
            sx={{ mr: 1 }}
          >
            Completed
          </Button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Button onClick={() => setSort("newest")}>Newest</Button>
          <Button onClick={() => setSort("oldest")}>Oldest</Button>
          <Button onClick={() => setSort("nameASC")}>NameASC</Button>
          <Button onClick={() => setSort("nameDSC")}>nameDSC</Button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <Button disabled={page === 4} onClick={() => setPage(page - 1)}>
            Prev
          </Button>
          <span style={{ margin: "0 10px" }}>
            page {page} of {totalPages}
          </span>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
        {!loading && error && (
          <Typography
            align="center"
            color="error"
            sx={{ mt: 4, fontSize: "22px" }}
          >
            ⚠️ {error}
          </Typography>
        )}

        {loading && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => {
              return skeletonCard();
            })}
          </div>
        )}
        {!loading &&
          (paginatedBookings.length === 0 ? (
            <Typography
              align="center"
              sx={{ gridColumn: "1/-1", mt: 5, fontSize: "25px" }}
            >
              No bookings found
            </Typography>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px",
              }}
            >
              {paginatedBookings.map((b) => (
                <Card
                  key={b._id}
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                    transition: "0.3s",
                    "&:hover": {
                      boxShadow: "0 8px 18px rgba(0,0,0,0.15)",
                      transform: "scale(1.01)",
                    },
                  }}
                >
                  <CardContent>
                    {editId == b._id ? (
                      <>
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          style={{
                            padding: "8px",
                            marginBottom: "8px",
                            width: "100%",
                          }}
                        />

                        <input
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          style={{ padding: "8px", width: "100%" }}
                        />
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleSave(b._id)}
                          >
                            Save
                          </Button>

                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                          >
                            Cancel
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6">
                          👤 <b>Name</b>: {b.userName}
                        </Typography>

                        <Typography variant="h6">
                          📞 <b>Phone</b>: {b.Phone}
                        </Typography>
                        <Typography>
                          📅 Date:{" "}
                          {b.createdAt
                            ? new Date(b.createdAt).toLocaleDateString()
                            : "N/A"}
                        </Typography>

                        <Typography>
                          ⏰ Time:{" "}
                          {b.createdAt
                            ? new Date(b.createdAt).toLocaleTimeString()
                            : "N/A"}
                        </Typography>

                        <Button
                          variant="outlined"
                          onClick={() => handleEdit(b)}
                          sx={{ mt: 1 }}
                        >
                          Edit
                        </Button>
                      </>
                    )}

                    <Typography
                      variant="subtitle2"
                      sx={{
                        mt: 1,
                        color: b.status === "completed" ? "green" : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      status: {b.status.toUpperCase() || "Pending"}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "20px",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircleIcon />}
                        sx={{
                          flex: 1,
                          textTransform: "none",
                          fontWeight: "bold",
                          borderRadius: "10px",
                        }}
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
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}

        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this booking?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
            <Button color="error" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </AnimatedPage>
    </PageWrapper>
  );
};

export default Bookings;
