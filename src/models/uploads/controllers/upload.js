// import { INTERNAL_SERVER_ERROR, POST_DATA_MESSAGE } from "../../products/constants/index.js";
import uploadFile from "../services/upload.js";

const uploadController = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ status: 400, error: "No file uploaded" });
    }

    const imageUrl = await uploadFile(req.file);  // ✅ Wait for upload

    res.status(200).json({
      status: 200,
      message: "File uploaded successfully",
      url: imageUrl, // Optional: return the uploaded image URL
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

export default uploadController;