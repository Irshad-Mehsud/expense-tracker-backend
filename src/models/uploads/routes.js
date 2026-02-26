import { Router } from "express";
import multer from "multer";
import uploadController from "./controllers/upload.js";

const router = Router();
// Multer memory storage for Vercel compatibility
const upload = multer({ storage: multer.memoryStorage() });
router.post("/", upload.single("image"), uploadController);

export default router;