import upLoadToCloudinary from "../../uploads/middleware/cloudinary.js";
import multer from "multer";
import path from "path";
import fs from "fs-extra";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = "uploads/";
    await fs.ensureDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export const uploadReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Use your existing cloudinary middleware
    const imageUrl = await upLoadToCloudinary(req.file.path, req.file.mimetype);
    
    // Clean up temp file (your cloudinary middleware already handles this)
    res.json({
      message: "Receipt uploaded successfully",
      imageUrl: imageUrl,
      fileName: req.file.originalname
    });
  } catch (error) {
    console.error("Upload error:", error);
    
    // Clean up temp file if upload failed
    if (req.file && req.file.path) {
      try {
        await fs.remove(req.file.path);
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
    }
    
    res.status(500).json({ 
      message: "Failed to upload receipt",
      error: error.message 
    });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = await upLoadToCloudinary(req.file.path, req.file.mimetype);
    
    res.json({
      message: "Profile picture uploaded successfully",
      imageUrl: imageUrl
    });
  } catch (error) {
    console.error("Profile upload error:", error);
    
    if (req.file && req.file.path) {
      try {
        await fs.remove(req.file.path);
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
    }
    
    res.status(500).json({ 
      message: "Failed to upload profile picture",
      error: error.message 
    });
  }
};