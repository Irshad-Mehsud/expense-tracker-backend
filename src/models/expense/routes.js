import express from "express";
import * as controller from "./controllers/allControllers.js";
import { upload, uploadReceipt } from "./uploads/index.js";
import { authentication } from "../../helpers/index.js";

const router = express.Router();

// Protect all expense routes
router.use(authentication);

// Expense CRUD routes
router.post("/", controller.create);
router.get("/", controller.list);
router.get("/stats", controller.getStats);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

// Receipt upload route (specific to expenses)
router.post("/:id/receipt", upload.single("receipt"), uploadReceipt);

export default router;