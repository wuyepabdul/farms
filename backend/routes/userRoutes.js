import express from "express";
import {
  updateProfileValidator,
  registerValidator,
  signinValidator,
  validatorResult,
} from "../middlewares/validator.js";

import { protect } from "../middlewares/authMiddleware.js";

import {
  authUserController,
  registerUserController,
  getUserProfileController,
  updateUserProfileController,
} from "../controllers/userController.js";

const router = express.Router();

//register a user route
//public
router.post(
  "/register",
  registerValidator,
  validatorResult,
  registerUserController
);

// login a user route
//public
router.post("/login", signinValidator, validatorResult, authUserController);

// get user profile route
// private
router.get("/profile", protect, getUserProfileController);

//update user profile route
//private
router.put(
  "/profile",
  protect,
  updateProfileValidator,
  validatorResult,
  updateUserProfileController
);

export default router;
