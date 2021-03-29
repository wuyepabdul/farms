import express from "express";
import {
  addOrderItemsController,
  getOrderByIdController,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addOrderItemsController);
router.get("/:id", protect, getOrderByIdController);
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
