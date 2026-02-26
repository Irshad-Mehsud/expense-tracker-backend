import express from "express";
import controllers from "./controllers/allControlers.js";
import { authentication } from "../../helpers/index.js";

const router = express.Router();

// Protect all goals routes
router.use(authentication);


// Allow add, list, get, and delete for goals
router.post("/", controllers.create);
router.get("/", controllers.list);
router.get("/:id", controllers.get);
router.delete("/:id", controllers.delete);

export default router;
