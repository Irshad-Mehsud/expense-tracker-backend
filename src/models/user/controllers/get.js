import {getData,getDataById}from "../services/get.js";
import jwt from "jsonwebtoken";
import User from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

const getController =async (req, res) => {
try {
    const user= await getData();
    res.status(200).json({ status:200, data: user,message:"User fetched successfully" });
} catch (error) {
    res.status(500).json({ status:500, error: error.message });
}
};

// const getUserByIdController =async (req, res) => {
    
// try {
//     const {userId}= req.params;
//     const singleUser= await getDataById(userId);
//     res.status(200).json({ status:200, data: singleUser,message:"User fetched successfully" });
// } catch (error) {
//     res.status(500).json({ status:500, error: error.message });
// }
// };
// Controller
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ status: 200, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};







export {
    getController,
    getCurrentUser
}