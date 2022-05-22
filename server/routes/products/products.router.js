const express = require("express");
const router = express.Router();
require("dotenv").config();

const {
  httpCreateProduct,
  httpCreatePrice,
  httpCreateCheckOutSessions,
  httpGetAllProducts,
  httpGetProductsById,
} = require("../../controller/product/product.controller");

router
  .post("/create-products", httpCreateProduct)
  .post("/create-price", httpCreatePrice)
  .post("/create-checkout-session", httpCreateCheckOutSessions);

router.get("/", httpGetAllProducts);
router.get("/:id", httpGetProductsById);

module.exports = router;
