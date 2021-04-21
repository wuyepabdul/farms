import express from "express";

import { protect, isAdmin } from "../middlewares/authMiddleware.js";

import {
  createProductController,
  deleteProductController,
  deleteUserController,
  getAllUsersController,
  getOrdersController,
  getUserByIdController,
  updateOrderToDelivered,
  updateOrderToOutForDelivery,
  updateProductController,
  updateUserController,
} from "../controllers/adminControllers.js";

const router = express.Router();

// get all users route
router.get("/users", protect, isAdmin, getAllUsersController);

// get all orders
router.get("/orders", protect, isAdmin, getOrdersController);

// update order to outForDelivery
router.put(
  "/orders/:id/outForDelivery",
  protect,
  isAdmin,
  updateOrderToOutForDelivery
);

//update order to delivered
router.put("/orders/:id/delivered", protect, isAdmin, updateOrderToDelivered);

//create a product
router.post("/products", protect, isAdmin, createProductController);

// get user by id route
router.get("/users/:id", protect, getUserByIdController);

// delete a user route
router.delete("/users/:id", protect, isAdmin, deleteUserController);

// delete a product route
router.delete("/products/:id", protect, isAdmin, deleteProductController);

// Update a product route
router.put("/products/:productId", protect, isAdmin, updateProductController);

// update a user by id route
router.put("/user/:id", protect, isAdmin, updateUserController);

export default router;
