import bcrypt from "bcryptjs";
import User from "../models/index.js";
import  userValidation  from "../validations/userValidation.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// const createUser = async (userData) => {
//     const user = new User(userData);
//     await user.save();
//     return user;
// };

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




// follow user
// const followUser = async (req, res) => {
//   try {
//    const currentUserId = req.body.id;   // the user who follows
//    const targetUserId = req.params.id;  // the user to be followed


//     // console.log(currentUserId, targetUserId);

//     if (currentUserId === targetUserId) {
//       return res.status(400).json({ message: "You cannot follow yourself" });
//     }

//     await User.findByIdAndUpdate(currentUserId, {
//       $addToSet: { following: targetUserId },
//     });

//     await User.findByIdAndUpdate(targetUserId, {
//       $addToSet: { followers: currentUserId },
//     });

//     res.status(200).json({ message: "Followed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// unfollow user
//  const unfollowUser = async (req, res) => {
//   try {
//    const currentUserId = req.body.id;   // the user who follows
//    const targetUserId = req.params.id;  // the user to be followed

//     if (currentUserId === targetUserId) {
//       return res.status(400).json({ message: "You cannot unfollow yourself" });
//     }

//     await User.findByIdAndUpdate(currentUserId, {
//       $pull: { following: targetUserId },
//     });

//     await User.findByIdAndUpdate(targetUserId, {
//       $pull: { followers: currentUserId },
//     });

//     res.status(200).json({ message: "Unfollowed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


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