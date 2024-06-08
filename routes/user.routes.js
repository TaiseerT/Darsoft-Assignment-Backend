import express from "express";
import {
  createUser,
  Login,
  updateUser,
} from "../controllers/user.controller.js";
import {
  registerUserValidator,
  validate,
  loginValidator,
} from "../middlewares/validator.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
const userRoutes = express.Router();

userRoutes.post("/create-user", registerUserValidator, validate, createUser);
userRoutes.post("/login", loginValidator, validate, Login);
userRoutes.patch("/update-user", verifyToken, updateUser);

export default userRoutes;