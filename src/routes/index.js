
import { Router } from "express";
import userRoutes from "../models/user/routes.js";
import expenseRoutes from "../models/expense/routes.js";
import incomeRoutes from "../models/income/routes.js";
import goalsRoutes from "../models/goals/routes.js";
import uploadRoutes from "../models/uploads/routes.js";

const router = Router();


router.use("/auth", userRoutes);
router.use("/expenses", expenseRoutes);
router.use("/incomes", incomeRoutes);
router.use("/goals", goalsRoutes);
router.use("/upload", uploadRoutes);

export default router;