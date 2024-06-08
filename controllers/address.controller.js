import { User } from "../models/user.model.js";
import { Address } from "../models/address.model.js";

export async function createAddress(req, res) {
  try {
    const userId = req.user.id;
    const { name, city, street, location } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const existingAddress = await Address.findOne({
      name: name,
      city: city,
      street: street,
      location: location,
      user: userId,
    });
    if (existingAddress)
      return res.status(409).json({ message: "Address already exists" });
    const address = new Address({
      name,
      city,
      street,
      location,
      user: userId,
    });
    await address.save();
    await user.updateOne({ address: address });
    await user.save();
    return res.status(200).json({ message: "Address added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getUserAddresses(req, res) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const address = await Address.find({ user: userId });
    if (address.length === 0)
      return res
        .status(404)
        .json({ message: "No addresses found for this user" });
    return res.status(200).json({ address });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteAddress(req, res) {
  try {
    const userId = req.user.id;
    const addressId = req.params.addressId;
    console.log("addressId: ", addressId);
    console.log("userId: ", userId);
    const user = await User.findById(userId);
    console.log("user: ", user);
    if (!user) return res.status(404).json({ message: "User not found" });
    const address = await Address.findOne({ _id: addressId, user: userId });
    console.log("address: ", address);
    if (!address) return res.status(404).json({ message: "Address not found" });
    await Address.findByIdAndDelete(addressId);
    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
