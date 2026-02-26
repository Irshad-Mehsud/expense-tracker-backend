import { Router } from "express";
import multer from "multer";
import uploadController from "./controllers/upload.js";

const router = Router();
// Multer configuration
const upload = multer({ dest: "src/modules/uploads/files/" }); 
// Destination folder for uploaded files
router.post("/", upload.single("image"), uploadController);

export default router;