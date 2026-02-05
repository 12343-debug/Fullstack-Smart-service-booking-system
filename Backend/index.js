require("dotenv").config();
console.log("JWT FROM ENV =", process.env.JWT_SECRET);
console.log("MONGO FROM ENV =", process.env.MONGO_URI);

console.log("🔥 INDEX.JS LOADED 🔥");

const express = require("express");
const cors = require("cors");
const User = require('./models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleWear/authMiddlewear");




const app = express();

app.use(cors());
app.use(express.json());

const connectDB =require('./db');
connectDB();

const Service = require('./models/Shema');
const Booking = require('./models/Booking');

// authentication
app.post("/register", async(req,res)=>{
  try {
    const {name,email,password} =req.body;

     // 1. Validation
    if(!name || !email || !password){
      return res.status(400).json({ message:"All fields required" });
    }

    if(password.length < 6){
      return res.status(400).json({ message:"Password must be 6 characters" });
    }

    // 2. Check existing user
    const existUser = await User.findOne({ email });
    if(existUser){
      return res.status(400).json({ message:"Email already registered" });
    }
    const hashed = await bcrypt.hash(password,10);

    const user = new User({
    name,
    email,
    password:hashed
  });
  await user.save();
  res.send("user registered");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message:"Server error" });
    
  }
  
});


// login api email,password
app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    // 1. Validation
    if(!email || !password){
      return res.status(400).json({ message:"All fields required" });

    }

    // 2. Find user
    const user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ message:"Invalid credentials" });
      console.log("USER:", user);
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ message:"Invalid credentials" });

    }
    console.log("JWT SECRET:", process.env.JWT_SECRET);

    // 4. Create token
   if(!process.env.JWT_SECRET){
  return res.status(500).json({message:"JWT secret missing"});
}

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn:"1d" }
);


    res.json({ token})
  

  } catch (error) {
    console.log(error);
    res.status(500 ).json({ message:"Server error" });
  }
});


app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/services", async(req, res) => {
 const data = await Service.find();
 res.json(data);
});

app.post("/add-service",async(req,res)=>{
    const serviceData = new Service({
        title:req.body.title,
    });

    await serviceData.save();
    res.send("data added");
})

// adding bookings
app.post("/book",authMiddleware, async (req, res) => {
  const booking = await Booking({
    serviceTitle: req.body.serviceTitle,
    userName:req.body.userName,
    Phone:req.body.Phone
  });
  await booking.save();
  res.send("Booking saved");
});



// book api(getting bookings)
app.get("/bookings",authMiddleware, async(req,res)=>{
    const data = await Booking.find();
     res.json(data);
});

// delete bookings api
app.delete("/bookings/:id",authMiddleware, async(req,res)=>{
  await Booking.findByIdAndDelete(req.params.id,);
  res.send("Bookings Deleted");

});

app.put("/bookings/:id",authMiddleware, async (req, res) => {
  await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status }
  );
  res.send("Booking Updated");
});



// EDIT NAME + PHONE
app.put("/bookings/edit/:id", async (req, res) => {
  try {
    const { userName, Phone } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, {
      userName,
      Phone
    });

    res.send("Booking details updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Update failed");
  }
});







app.listen(5000, () => {
  console.log("servier running on port 5000");
});
