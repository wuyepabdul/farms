import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// @desc Get all users
// @route GET /api/admin/users
// @access Private/Admin
export const getAllUsersController = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    if (users) {
      res.json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    // handle error
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc Get all orders
// @route GET /api/admin/orders
// @access Private/Admin
export const getOrdersController = asyncHandler(async (req, res) => {
  try {
    //find orders
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "id name");

    //check if orders
    if (orders.length === 0) {
      res.json({ message: "There are no orders at this time" });
    } else {
      res.json(orders);
    }
  } catch (error) {
    //handle error
    console.log("getOrdersController error", error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc Get user by id
// @route GET /api/admin/users:id
// @access Private/Admin
export const getUserByIdController = asyncHandler(async (req, res) => {
  try {
    //find user
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      //send back user
      res.json(user);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    // handle error
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc Update order to outForDelivery
// @route PUT /api/orders/:id/outForDelivery
// @access Private
export const updateOrderToOutForDelivery = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.outForDelivery = true;
      order.outForDeliveryAt = Date.now();

      //save and send back updated order updates
      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    //handle error
    console.error("updatedOrderToOutForDelivery error", error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/delivered
// @access Private
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      //save and send back updated order updates
      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    //handle error
    console.error("updatedOrderToDelivered error", error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc Update user
// @route PUT/api/admin/users:id
// @access Private/Admin
export const updateUserController = asyncHandler(async (req, res) => {
  try {
    // find user
    const user = await User.findById(req.params.id);

    if (user) {
      //update user
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      //save and send back updated user details
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    //handle error
    console.log("admin updateUserController error", error.message);
    res.status(500).json({ message: "Server Error, try again later" });
  }
});

// @desc Delete a user
// @route DELETE /api/admin/users/:id
// @access Private/Admin
export const deleteUserController = asyncHandler(async (req, res) => {
  try {
    //find user
    const user = await User.findById(req.params.id);

    if (user) {
      //delete user
      await user.remove();
      res.json({ message: "User Deleted Successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // handle error
    console.log("deleteUserController error", error.message);
    res.status(500).json({ message: "Server error,try again later" });
  }
});

// @desc Delete a product
// @route DELETE /api/admin/products/:id
// @access Private/Admin
export const deleteProductController = asyncHandler(async (req, res) => {
  try {
    // find product
    const product = await Product.findById(req.params.id);

    // delete product
    if (product) {
      await product.remove();
      res.json({ message: "Product deleted successfully" });
    } else {
      res.json({ message: "Product not found" });
    }
  } catch (error) {
    // handle error
    console.log("deleteProductController error", error.message);
  }
});

// @desc Create a product
// @route POST /api/admin/products/
// @access Private/Admin
export const createProductController = asyncHandler(async (req, res) => {
  try {
    const product = new Product({
      name: "Sample name",
      price: "0",
      user: req.user._id,
      image: "image",
      brand: "Sample Brand",
      category: "sample category",
      countInStock: 0,
      numReviews: 0,
      description: "sample description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error.message);
    console.log(req.user);
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc Update a product
// @route PUT /api/admin/products/:id
// @access Private/Admin
export const updateProductController = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    } = req.body;

    // find product
    const product = await Product.findById(req.params.productId);

    //update product
    if (product) {
      product.name = name;
      product.price = price;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
      product.description = description;

      //save and send back updated details
      const updatedProduct = await product.save();
      res.status(201).json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error: try again later" });
  }
});
