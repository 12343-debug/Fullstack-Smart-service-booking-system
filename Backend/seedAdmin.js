require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const adminName = process.env.ADMIN_NAME || process.argv[2];
const adminEmail = process.env.ADMIN_EMAIL || process.argv[3];
const adminPassword = process.env.ADMIN_PASSWORD || process.argv[4];

async function seedAdmin() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  if (!adminName || !adminEmail || !adminPassword) {
    throw new Error(
      "Provide admin credentials with ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD or as: node seedAdmin.js \"Name\" email password",
    );
  }

  if (adminPassword.length < 6) {
    throw new Error("Admin password must be at least 6 characters");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const existingUser = await User.findOne({ email: adminEmail });

  if (existingUser) {
    existingUser.name = adminName;
    existingUser.password = hashedPassword;
    existingUser.role = "admin";
    await existingUser.save();
    console.log(`Admin user updated: ${adminEmail}`);
  } else {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });
    console.log(`Admin user created: ${adminEmail}`);
  }
}

seedAdmin()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
