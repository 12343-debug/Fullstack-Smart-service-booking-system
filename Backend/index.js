require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connectDB = require("./db");
const User = require("./models/User");
const Service = require("./models/Service");
const Booking = require("./models/Booking");
const authMiddleware = require("./middler/authMiddleware");
const adminMiddleware = require("./middler/adminMiddleware");

const app = express();
const otpStore = {};

const STATUS_VALUES = [
  "pending",
  "confirmed",
  "in_progress",
  "completed",
  "cancelled",
];

const ALL_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const normalizeBookingDate = (value) => {
  const raw = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return { error: "Valid booking date is required" };
  }

  const parsedDate = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) {
    return { error: "Invalid booking date" };
  }

  return { value: raw };
};

const allowedOrigins = (process.env.CLIENT_URLS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());

connectDB();

const canModifyBooking = (booking, req) => {
  if (!booking) return false;
  if (req.userRole === "admin") return true;
  return booking.userId?.toString() === req.userId;
};

const normalizeLocation = (location = {}) => {
  const address = String(location.address || "").trim();
  const notes = String(location.notes || "").trim();
  const latitude =
    location.latitude === "" || location.latitude === null || location.latitude === undefined
      ? null
      : Number(location.latitude);
  const longitude =
    location.longitude === "" || location.longitude === null || location.longitude === undefined
      ? null
      : Number(location.longitude);

  if (!address) {
    return { error: "Service address is required" };
  }

  if ((latitude !== null && Number.isNaN(latitude)) || (longitude !== null && Number.isNaN(longitude))) {
    return { error: "Invalid map coordinates" };
  }

  return {
    value: {
      address,
      notes,
      latitude,
      longitude,
    },
  };
};

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

// Authentication
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 characters" });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    return res.send("user registered");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret missing" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({ token, role: user.role });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Services
app.get("/services", async (_req, res) => {
  const data = await Service.find();
  res.json(data);
});

app.post("/add-service", async (req, res) => {
  const { title, icon, image, price, estimatedDuration } = req.body;

  if (!title || !icon || !image || price === undefined || !estimatedDuration) {
    return res.status(400).json({ message: "Title, icon, image, price and duration are required" });
  }

  const normalizedPrice = Number(price);
  if (Number.isNaN(normalizedPrice) || normalizedPrice < 0) {
    return res.status(400).json({ message: "Price must be a valid positive number" });
  }

  const service = new Service({
    title: String(title).trim(),
    icon: String(icon).trim(),
    image: String(image).trim(),
    price: normalizedPrice,
    estimatedDuration: String(estimatedDuration).trim(),
  });
  await service.save();
  res.send("services added");
});

app.delete("/services/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted successfully" });
});

// Bookings
app.post("/book", authMiddleware, async (req, res) => {
  const { serviceTitle, userName, Phone, slot, bookingDate, location } = req.body;

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(Phone)) {
    return res.status(400).json({ message: "Invalid phone number" });
  }

  if (!slot) {
    return res.status(400).json({ message: "Slot is required" });
  }

  if (!ALL_SLOTS.includes(slot)) {
    return res.status(400).json({ message: "Invalid slot selected" });
  }

  const normalizedBookingDate = normalizeBookingDate(bookingDate);
  if (normalizedBookingDate.error) {
    return res.status(400).json({ message: normalizedBookingDate.error });
  }

  const normalizedLocation = normalizeLocation(location);
  if (normalizedLocation.error) {
    return res.status(400).json({ message: normalizedLocation.error });
  }

  const activeSlotBooking = await Booking.findOne({
    bookingDate: normalizedBookingDate.value,
    slot,
    status: { $in: ["pending", "confirmed", "in_progress"] },
  });
  if (activeSlotBooking) {
    return res.status(409).json({ message: "Slot already booked, choose another slot" });
  }

  const booking = new Booking({
    serviceTitle,
    userName,
    Phone,
    slot,
    bookingDate: normalizedBookingDate.value,
    location: normalizedLocation.value,
    userId: req.userId,
    status: "pending",
  });

  await booking.save();
  return res.send("Booking saved");
});

app.get("/bookings", authMiddleware, async (req, res) => {
  const data = await Booking.find({ userId: req.userId });
  res.json(data);
});

app.delete("/bookings/:id", authMiddleware, async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  if (!canModifyBooking(booking, req)) {
    return res.status(403).json({ message: "Not allowed to delete this booking" });
  }

  await Booking.findByIdAndDelete(req.params.id);
  res.send("Bookings Deleted");
});

app.put("/bookings/:id", authMiddleware, async (req, res) => {
  const status = String(req.body.status || "").toLowerCase();

  if (!STATUS_VALUES.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value",
      allowed: STATUS_VALUES,
    });
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  if (!canModifyBooking(booking, req)) {
    return res.status(403).json({ message: "Not allowed to update this booking" });
  }

  await Booking.findByIdAndUpdate(req.params.id, { status });
  res.send("Booking Updated");
});

app.put("/bookings/edit/:id", authMiddleware, async (req, res) => {
  try {
    const { userName, Phone, location } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (!canModifyBooking(booking, req)) {
      return res.status(403).json({ message: "Not allowed to edit this booking" });
    }

    const updates = {
      userName,
      Phone,
    };

    if (location) {
      const normalizedLocation = normalizeLocation(location);
      if (normalizedLocation.error) {
        return res.status(400).json({ message: normalizedLocation.error });
      }
      updates.location = {
        ...booking.location?.toObject?.(),
        ...normalizedLocation.value,
      };
    }

    await Booking.findByIdAndUpdate(req.params.id, updates);

    res.send("Booking details updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Update failed");
  }
});

app.put("/bookings/:id/reschedule", authMiddleware, async (req, res) => {
  try {
    const { slot, bookingDate, reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (!canModifyBooking(booking, req)) {
      return res.status(403).json({ message: "Not allowed to reschedule this booking" });
    }
    if (!slot || !ALL_SLOTS.includes(slot)) {
      return res.status(400).json({ message: "Valid slot is required" });
    }

    const normalizedBookingDate = normalizeBookingDate(bookingDate || booking.bookingDate);
    if (normalizedBookingDate.error) {
      return res.status(400).json({ message: normalizedBookingDate.error });
    }

    if (["completed", "cancelled"].includes(booking.status)) {
      return res.status(400).json({ message: "Completed/Cancelled booking cannot be rescheduled" });
    }

    const activeSlotBooking = await Booking.findOne({
      _id: { $ne: booking._id },
      bookingDate: normalizedBookingDate.value,
      slot,
      status: { $in: ["pending", "confirmed", "in_progress"] },
    });
    if (activeSlotBooking) {
      return res.status(409).json({ message: "Slot already booked, choose another slot" });
    }

    booking.rescheduledFrom = `${booking.bookingDate || ""} ${booking.slot}`.trim();
    booking.bookingDate = normalizedBookingDate.value;
    booking.slot = slot;
    booking.status = "confirmed";
    booking.rescheduleReason = reason || "";
    await booking.save();

    return res.json({ message: "Booking rescheduled", booking });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Reschedule failed" });
  }
});

app.put("/bookings/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (!canModifyBooking(booking, req)) {
      return res.status(403).json({ message: "Not allowed to cancel this booking" });
    }
    if (booking.status === "completed") {
      return res.status(400).json({ message: "Completed booking cannot be cancelled" });
    }

    booking.status = "cancelled";
    booking.cancelReason = reason || "Cancelled by user";
    booking.cancelledBy = req.userRole === "admin" ? "admin" : "user";
    await booking.save();

    return res.json({ message: "Booking cancelled", booking });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Cancel failed" });
  }
});

app.get("/admin/bookings", authMiddleware, adminMiddleware, async (req, res) => {
  const bookings = await Booking.find().populate("userId", "email");
  res.json(bookings);
});

// OTP
app.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[phone] = otp;
  console.log("OTP for", phone, ":", otp);

  res.json({ message: "OTP sent successfully" });
});

app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] == otp) {
    delete otpStore[phone];
    return res.json({ verified: true });
  }

  return res.status(400).json({ message: "Invalid OTP" });
});

// Slots
app.get("/available-slots", async (_req, res) => {
  const normalizedBookingDate = normalizeBookingDate(_req.query.date);
  if (normalizedBookingDate.error) {
    return res.status(400).json({ message: normalizedBookingDate.error });
  }

  const bookings = await Booking.find({
    bookingDate: normalizedBookingDate.value,
    status: { $in: ["pending", "confirmed", "in_progress"] },
  });

  const bookedSlots = bookings.map((b) => b.slot);
  const availableSlots = ALL_SLOTS.filter((slot) => !bookedSlots.includes(slot));

  res.json(availableSlots);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
