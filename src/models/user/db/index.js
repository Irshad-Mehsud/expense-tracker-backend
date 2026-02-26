import bcrypt from "bcryptjs";
import User from "../models/index.js";
import  userValidation  from "../validations/userValidation.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const createUser = async (userData) => {
  // 1️⃣ Validate user input using Joi
  const { error } = userValidation(userData);
  if (error) {
    throw new Error(error.details.map((err) => err.message).join(", "));
  }

  const { name, email, password, profilePicture, coverPicture } = userData;

  // 2️⃣ Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 3️⃣ Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4️⃣ Create a new user instance
  const user = new User({
    name,
    email,
    password: hashedPassword,
    profilePicture,
    coverPicture
  });

  // 5️⃣ Save to database
  await user.save();

  // 6️⃣ Remove password before returning response
  const userResponse = user.toObject();
  delete userResponse.password;

  return userResponse;
};




const getAllData = async () => {
    const users = await User.find({}).select("-password");
    return users; // password will already be stripped out
};

const getUserById = async (id) => {
    const user = await User.findById(id).select("-password");
    return user;
};

const updattedById = async (id, data) => {
  try {
    await User.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};

const deleteById = async (id) => {
  try {
    await User.findByIdAndDelete(id); 
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};















export {
    createUser,
    // followUser,
    // unfollowUser,
    getAllData,
    getUserById,
    updattedById,
    deleteById
}