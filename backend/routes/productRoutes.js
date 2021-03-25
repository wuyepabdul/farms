import express from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// @desc Fetch all products
// @route Get /api/products
// @access Public
router.get("/", getAllProducts);

router.get("/:id", getProductById);

export default router;
