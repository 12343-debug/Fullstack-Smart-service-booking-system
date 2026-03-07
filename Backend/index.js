require("dotenv").config();
console.log("JWT FROM ENV =", process.env.JWT_SECRET);
console.log("MONGO FROM ENV =", process.env.MONGO_URI);

console.log("🔥 INDEX.JS LOADED 🔥");

const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middler/authMiddleware");
const adminMiddleware = require("./middler/adminMiddleware");
// const sendEmail = require("./sendEmail");

const app = express();
const otpStore = {};

app.use(cors());
app.use(express.json());

const connectDB = require("./db");
connectDB();

const Service = require("./models/Service");
const Booking = require("./models/Booking");

// authentication
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be 6 characters" });
    }

    // 2. Check existing user
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
    });
    await user.save();
//     await sendEmail(
//   email,
//   "Welcome to Smart Service Booking",
//   `Hi ${name},\n\nThank you for registering with Smart Service Booking System.\nWe are happy to have you!\n\n- Team Smart Service`
// );
    res.send("user registered");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// login api email,password
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
      console.log("USER:", user);
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("JWT SECRET:", process.env.JWT_SECRET);

    // 4. Create token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret missing" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      role: user.role, // optional but useful
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => {
  
  res.send("Backend is running");
  
});

app.get("/services", async (req, res) => {
  const data = await Service.find();
  res.json(data);
});

app.post("/add-service", async (req, res) => {
  const { title, icon, image } = req.body;
  const service = new Service({
    title,
    icon,
    image,
  });
  await service.save();
  res.send("services added");
  // const serviceData = new Service({
  //     title:req.body.title,
  // });

  // await serviceData.save();
  // res.send("data added");
});

// adding bookings
app.post("/book", authMiddleware, async (req, res) => {

  const { serviceTitle, userName, Phone ,slot} = req.body;

  const phoneRegex = /^[6-9]\d{9}$/;

  if(!phoneRegex.test(Phone)){
    return res.status(400).json({message:"Invalid phone number"});
  }

  const booking = new Booking({
    serviceTitle,
    userName,
    Phone,
    slot,
    userId:req.userId
  });

  await booking.save();

  res.send("Booking saved");

});
// book api(getting bookings)
app.get("/bookings", authMiddleware, async (req, res) => {
  const data = await Booking.find({ userId: req.userId });
  res.json(data);
});

// delete bookings api
app.delete("/bookings/:id", authMiddleware, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.send("Bookings Deleted");
});

app.put("/bookings/:id", authMiddleware, async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status });
  res.send("Booking Updated");
});

// edit name and phone number
app.put("/bookings/edit/:id", async (req, res) => {
  try {
    const { userName, Phone } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, {
      userName,
      Phone,
    });

    res.send("Booking details updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Update failed");
  }
});

app.get(
  "/admin/bookings",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const bookings = await Booking.find().populate("userId", "email");
    res.json(bookings);
  },
);

app.listen(5000, () => console.log("Server running on port 5000"));


app.delete("/services/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted successfully" });
});


// otp verification
app.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[phone] = otp;

  console.log("OTP for", phone, ":", otp); // simulate SMS

  res.json({ message: "OTP sent successfully" });
});

// verifying otp
app.post("/verify-otp", (req, res) => {

  const { phone, otp } = req.body;

  if (otpStore[phone] == otp) {
    delete otpStore[phone];
    return res.json({ verified: true });
  }

  res.status(400).json({ message: "Invalid OTP" });

});

// booking slots api
app.get("/available-slots", async (req,res)=>{

const allSlots = [
"10:00 AM",
"11:00 AM",
"12:00 PM",
"1:00 PM",
"2:00 PM",
"3:00 PM",
"4:00 PM",
"5:00 PM"
];

const bookings = await Booking.find();

const bookedSlots = bookings.map(b => b.slot);

const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

res.json(availableSlots);

});


app.listen(5000, () => {
  console.log("server running on port 5000");
});
