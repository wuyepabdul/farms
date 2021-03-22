const express = require("express");

const dotenv = require("dotenv");
const dbConnection = require("./config/connection");
const products = require("./products");

dotenv.config();
const app = express();

/* ***************************************************MIDDLEWARES************************************* */

app.use(express.json());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

dbConnection();

/* **************************************************SERVER CONNECTION********************************* */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
