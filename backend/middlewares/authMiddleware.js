import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

/* protect a route */
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded) {
        req.user = await User.findById(decoded.id).select("-password");
      } else {
        res.status(400).json({ message: "Invalid token" });
      }
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401).json({ message: "Token has Expired" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Access Denied: No token" });
  }
});