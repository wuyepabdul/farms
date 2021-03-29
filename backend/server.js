import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/connection.js";
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

/* ***************************************************MIDDLEWARES************************************* */
dbConnection();

// parse requests of content-type - application/json
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(notFound);
app.use(errorHandler);

/* **************************************************SERVER CONNECTION********************************* */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
