import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route Get /api/products
// @access Public
export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log("getAllProductsController error", error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc Fetch a single product
// @route Get /api/products/:id
// @access Public
export const getProductById = expressAsyncHandler(async (req, res) => {
  /* const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw Error;
  } */
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("getProductById error", error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});
