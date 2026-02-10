const mongoose = require("mongoose");
const Service = require("./models/Service");

mongoose.connect(process.env.MONGO_URI);

const services = [
  {
    title: "Electrician",
    icon: "⚡",
    image: "https://cdn-icons-png.flaticon.com/512/1995/1995471.png",
  },
  {
    title: "Plumber",
    icon: "🚰",
    image: "https://cdn-icons-png.flaticon.com/512/1995/1995583.png",
  },
  {
    title: "AC Repair",
    icon: "❄️",
    image: "https://cdn-icons-png.flaticon.com/512/2933/2933822.png",
  },
  {
    title: "Home Cleaning",
    icon: "🧹",
    image: "https://cdn-icons-png.flaticon.com/512/1995/1995521.png",
  },
  {
    title: "Laptop Repair",
    icon: "💻",
    image: "https://cdn-icons-png.flaticon.com/512/1995/1995486.png",
  },
];

async function seed() {
  await Service.insertMany(services);
  console.log("✅ Services added");
  process.exit();
}

seed();
