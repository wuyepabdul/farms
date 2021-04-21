import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAllProductsController,
  getProductByIdController,
  getTopProductsController,
  createProductReviewController,
} from "../controllers/productController.js";

const router = express.Router();

//get all products route
router.get("/", getAllProductsController);

//get top products route
router.get("/top", getTopProductsController);

// get a product by id route
router.get("/:id", getProductByIdController);

//create a product review route
router.post("/:id/reviews", protect, createProductReviewController);

export default router;
