import mongoose from "mongoose";

import { User } from "../models/user.model.js";
import { config } from "dotenv";
import bcrypt from "bcryptjs";

config({ path: "../.env" });

mongoose
  .connect(process.env.DB_URL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

const admin = {
  full_name: "Mohammad Taiseer Tello",
  email: "taiseertello@gmail.com",
  password: "123456789",
  role: "Admin",
};

async function seedAdmin() {
  const hashedPassword = await bcrypt.hash(admin.password, 10);
  admin.password = hashedPassword;
  const isThereAdmin = await User.findOne({ role: "Admin" });
  if (isThereAdmin) {
    console.log("Admin already exists");
    return;
  } else {
    await User.create(admin);
  }
}

seedAdmin()
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
