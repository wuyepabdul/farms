import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// @desc Auth user and get token
// @route POST /api/users/login
// @access Public

export const authUserController = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const matchedPassword = await bcrypt.compare(password, user.password);

    if (user && matchedPassword) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Register new user
// @route POST /api/users
// @access Public

export const registerUserController = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    if (savedUser) {
      res.status(201).json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        token: generateToken(savedUser._id),
      });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid User Data" });
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

export const getUserProfileController = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error, try again later" });
  }
});
