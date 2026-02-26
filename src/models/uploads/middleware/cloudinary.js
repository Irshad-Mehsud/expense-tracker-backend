import { v2 as cloudinary } from 'cloudinary';
import fs from "fs-extra";
import sharp from 'sharp';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upLoadToCloudinary = async (filePath, mimeType) => {
  try {
    // Validate MIME type
    if (!mimeType) {
      throw new Error("Could not determine MIME type.");
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(mimeType)) {
      throw new Error(`Unsupported file type: ${mimeType}`);
    }

    // Ensure directory exists
    const uploadDir = path.dirname(filePath);

    // Safely generate compressed file path
    const originalFileName = path.basename(filePath); // e.g. "abc123"
    const compressedFileName = originalFileName + '.webp'; // "abc123.webp"
    const compressedPath = path.join(uploadDir, compressedFileName); // uploads/abc123.webp

    // Compress and convert to WebP
    await sharp(filePath)
      .webp({ quality: 20 })
      .toFile(compressedPath);

    console.log("Image compressed and saved as:", compressedPath);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(compressedPath, {
      folder: "Expense-Tracker-App",
      resource_type: "image",
    });

    console.log("Uploaded to Cloudinary:", result.secure_url);

    // Delete original and compressed files
    await fs.remove(filePath);
    await fs.remove(compressedPath);
    console.log("Local files deleted.");

    return result.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);

    // Clean up
    if (await fs.pathExists(filePath)) await fs.remove(filePath);

    const uploadDir = path.dirname(filePath);
    const originalFileName = path.basename(filePath);
    const compressedFileName = originalFileName + '.webp';
    const compressedPath = path.join(uploadDir, compressedFileName);
    
    if (await fs.pathExists(compressedPath)) await fs.remove(compressedPath);

    throw error;
  }
};

export default upLoadToCloudinary;