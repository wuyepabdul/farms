import express from "express";
import {
  addOrderItemsController,
  getMyOrdersController,
  getOrderByIdController,
  updateOrderToPaid,
  verifyTransactionController,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// place an order route
// private
router.post("/", protect, addOrderItemsController);

// get my orders
// private
router.get("/myorders", protect, getMyOrdersController);

// verify transactions
// private
router.get("/verifyPayment/:trans_ref", protect, verifyTransactionController);

// get order by id
// private
router.get("/:id", protect, getOrderByIdController);

//update order to pay
//private
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;
