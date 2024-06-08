import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(req, res) {
  try {
    const { full_name, email, password } = req.body;
    const existingUser = await User.findOne({
      full_name: full_name,
      email: email,
      password: password,
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ full_name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
      expiresIn: "1d",
    });
    return res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { full_name, birthday, country, gender, phone_number } = req.body;

    const updatedFields = {};

    // Update only specified fields
    if (full_name) updatedFields.full_name = full_name;
    if (phone_number) updatedFields.phone_number = phone_number;
    if (gender) updatedFields.gender = gender;
    if (birthday) updatedFields.birthday = birthday;
    if (country) updatedFields.country = country;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updatedFields,
      {
        new: true, // Return the updated document
      }
    );

    if (!updatedUser) {
      return res.status(204).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
