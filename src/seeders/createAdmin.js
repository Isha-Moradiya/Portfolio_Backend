import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
import { ROLE } from "../constants/databaseEnums.js";

dotenv.config()

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = "isha@example.com";  

  const exists = await User.findOne({ email });

  if (exists) {
    console.log("Admin already exists, skipping seeder.");
    process.exit(0);
  }

  const hashed = await bcrypt.hash("Isha@1310", 10);

  await User.create({
    name: "Isha Moradiya",
    email,
    password: hashed,
    role: ROLE.ADMIN,
    phone: "+91 9879031457",
    address: "Surat, Gujarat, India",
  });

  console.log("Admin created successfully!");
  process.exit(0);
};

createAdmin();
