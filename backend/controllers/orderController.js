import asyncHandler from "express-async-handler";
import { verifyTransaction } from "../apiCalls/paystack/verifyTransaction.js";
import Order from "../models/orderModel.js";

// @desc Create new Order
// @route POST /api/orders
// @access Private
export const addOrderItemsController = asyncHandler(async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // check order items is not empty
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "No order Items" });
    } else {
      // create new order
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      //save order
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    // handle error
    res.status(500).json({ message: "Server error: try again later" });
  }
});

// @desc GET Order by id
// @route GET /api/orders/:id
// @access Private
export const getOrderByIdController = asyncHandler(async (req, res) => {
  try {
    // find order
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    //check if order exist
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    // handle error
    console.log("getOrderByIdController error", error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    //update order if it exist
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      //save updates
      const updatedOrder = await order.save();

      //send back updated order
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    // handle error
    console.log("updateOrderToPaid error", error.message);
    res.status(500).json({ message: "Server error, try again later" });
  }
});

// @desc verify transaction
// @route GET /api/orders/verify
// @access Private
export const verifyTransactionController = asyncHandler(async (req, res) => {
  try {
    const { data } = await verifyTransaction(req.params.trans_ref);
    res.json(data);
  } catch (error) {
    console.log("error", error.message);
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrdersController = asyncHandler(async (req, res) => {
  try {
    // find all orders of loggedIn user
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "No orders found" });
    }
  } catch (error) {
    console.log("get my Order error", error.message);
    // handle error
    res.status(500).json({ message: "Server error: try again later" });
  }
});
