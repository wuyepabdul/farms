import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route Get /api/products
// @access Public
export const getAllProductsController = expressAsyncHandler(
  async (req, res) => {
    try {
      //check page
      const pageSize = 6;
      const page = Number(req.query.pageNumber || 1);

      // check for search keyword
      const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword, $options: "i" } }
        : {};

      //get total count of products
      const count = await Product.countDocuments({ ...keyword });

      // limit specifies no. of products to be return
      //skip specifies no. of products to skip
      const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      console.log("getAllProductsController error", error.message);
      res.status(500).json({ message: "Server error, try again later" });
    }
  }
);

// @desc Fetch top rated products
// @route Get /api/products/top
// @access Public
export const getTopProductsController = expressAsyncHandler(
  async (req, res) => {
    try {
      const products = await Product.find({}).sort({ rating: -1 }).limit(3);
      res.json(products);
    } catch (error) {
      console.log("get top products error,", error.message);
      res.status(500).json({ message: "Server error, try again later" });
    }
  }
);

// @desc Fetch a single product
// @route Get /api/products/:id
// @access Public
export const getProductByIdController = expressAsyncHandler(
  async (req, res) => {
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
  }
);

// @desc Create a Review
// @route POST /api/products/:id/reviews
// @access Private
export const createProductReviewController = expressAsyncHandler(
  async (req, res) => {
    try {
      const { rating, comment } = req.body;

      //find and check if product exist
      const product = await Product.findById(req.params.id);
      if (product) {
        const alreadyReviewed = product.reviews.find(
          (r) => r.user.toString() === req.user._id.toString()
        );

        //check if product is reviewed
        if (alreadyReviewed) {
          res.status(400).json({ message: "Product already reviewed" });
        } else {
          const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
          };

          // add review
          product.reviews.push(review);
          product.numReviews = product.reviews.length;

          // get average of the rating
          product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

          //save review
          await product.save();
          res.status(201).json({ message: "Review Added" });
        }
      } else {
        res.status(404).json({ message: "Product Not Found" });
      }
    } catch (error) {
      console.log("create review controller error", error.message);
      res.status(500).json({ message: "Server error: try again later" });
    }
  }
);
