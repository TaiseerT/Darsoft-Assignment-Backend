import {
  createAddressValidator,
  validate,
} from "../middlewares/validator.middleware.js";
import {
  createAddress,
  deleteAddress,
  getUserAddresses,
} from "../controllers/address.controller.js";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const addressRoutes = express.Router();
addressRoutes.post(
  "/create-address",
  verifyToken,
  createAddressValidator,
  validate,
  createAddress
);
addressRoutes.get("/get-addresses", verifyToken, getUserAddresses);
addressRoutes.delete("/:addressId/delete-address", verifyToken, deleteAddress);
export default addressRoutes;
