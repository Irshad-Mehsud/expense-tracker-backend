import express from "express";
import * as controller from "./controllers/allControllers.js";
import { authentication } from "../../helpers/index.js";

const router = express.Router();

// Protect all income routes
router.use(authentication);

// Income CRUD routes
router.post("/", controller.create);
router.get("/", controller.list);
router.get("/stats", controller.getStats);
router.get("/:id", controller.get);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
