import express from "express";
import path from "path";
import dotenv from "dotenv";
import https from "https";
import dbConnection from "./config/connection.js";
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// initalise environment variables
dotenv.config();

const app = express();

/* ***************************************************MIDDLEWARES************************************* */
dbConnection();

// parse requests of content-type - application/json
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

// mimmick common js path.join(__dirname)
const __dirname = path.resolve();

// make uploads folder static for browser accessibility
// and point to the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.get("/api/config/paystack", (req, res) => {
  res.send({ publicKey: process.env.PAYSTACK_PUBLIC_KEY });
});

/* **************************************************SERVER CONNECTION********************************* */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
