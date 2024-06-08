import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "User",
    },
    birthday: {
      type: Date,
    },
    country: {
      type: String,
    },
    gender: {
      type: String,
    },
    phone_number: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
