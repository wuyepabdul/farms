import express from "express";
import {
  authUserController,
  getUserProfileController,
  registerUserController,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", registerUserController);
router.post("/login", authUserController);
router.get("/profile", protect, getUserProfileController);

export default router;
