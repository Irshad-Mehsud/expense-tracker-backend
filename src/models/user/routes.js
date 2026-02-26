import { Router } from "express";
// import { followUser, unfollowUser } from "../user/db/index.js";
import postController from "./controllers/post.js";
import {getController,getCurrentUser} from "./controllers/get.js";
import updateController from "./controllers/update.js";
import deleteController from "./controllers/delete.js";
import { authentication } from "../../helpers/index.js";
import loginUser from "../user/authcontrollers/login.js";
const router = Router();

router.post("/register", postController);
router.get("/", authentication, getController)
router.get("/me", authentication, getCurrentUser)
router.put("/:id", updateController)
router.delete("/:id", deleteController);
router.post("/login", loginUser);

export default router;
