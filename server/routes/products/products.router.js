const express = require("express");
const router = express.Router();
require("dotenv").config();

const {
  httpCreateCheckoutSession,
  httpGetAllProducts,
  httpGetProductsById,
  httpGetProductsByCategory,
} = require("../../controller/product/product.controller");

router.post("/create-checkout-session", httpCreateCheckoutSession);

router
  .get("/", httpGetAllProducts)
  .get("/:id", httpGetProductsById)
  .get("/category/:category", httpGetProductsByCategory);

module.exports = router;
