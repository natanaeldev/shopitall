const express = require("express");
const router = express.Router();
require("dotenv").config();

const {
  httpCreateProduct,
  httpCreatePrice,
  httpCreateCheckOutSessions,
  httpGetAllProducts,
  httpGetProductsById,
  httpGetProductsByCategory,
} = require("../../controller/product/product.controller");

router
  .post("/create-products", httpCreateProduct)
  .post("/create-price", httpCreatePrice)
  .post("/create-checkout-session", httpCreateCheckOutSessions);

router
  .get("/", httpGetAllProducts)
  .get("/:id", httpGetProductsById)
  .get("/category/:category", httpGetProductsByCategory);

module.exports = router;
