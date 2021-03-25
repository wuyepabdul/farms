import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/connection.js";
import productRoute from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

/* ***************************************************MIDDLEWARES************************************* */
dbConnection();

app.use(express.json());

app.use("/api/products", productRoute);

app.use(notFound);
app.use(errorHandler);

/* **************************************************SERVER CONNECTION********************************* */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
