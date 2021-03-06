const express = require("express");
const router = express.Router();
require("dotenv").config();

const {
  httpCreateCheckOutSessions,
  httpGetAllProducts,
  httpGetProductsById,
  httpGetProductsByCategory,
} = require("../../controller/product/product.controller");

router.post("/create-checkout-session", httpCreateCheckOutSessions);

router
  .get("/", httpGetAllProducts)
  .get("/:id", httpGetProductsById)
  .get("/category/:category", httpGetProductsByCategory);

module.exports = router;
