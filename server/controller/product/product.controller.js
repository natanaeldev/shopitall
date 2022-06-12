require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
const {
  getProductsById,
  getPrices,
  getProductsByCategory,
  getAllStripeProducts,
} = require("../../model/product/products.model");

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

/**
 */
async function httpGetAllProducts(req, res) {
  const stripeProducts = await getAllStripeProducts();

  return await res.status(200).json(stripeProducts);
}

async function httpGetProductsById(req, res) {
  const id = req.params.id;
  await getProductsById(id)
    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((err) => {
      res.status(404).json({ message: "products not found" });
    });
}

async function httpGetProductsByCategory(req, res) {
  const category = req.params.category;

  await getProductsByCategory(category)
    .then((product) => {
      return res.status(200).json(product);
    })
    .catch((err) => {
      res.status(404).json({ message: "products not found", error: err });
    });
}

async function httpCreateCheckOutSessions(req, res) {
  const data = req.body;

  let line_items = data.map((product) => {
    return { price: product.price, quantity: 1 };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ url: session.url });
}

module.exports = {
  httpCreateCheckOutSessions,
  httpGetAllProducts,
  httpGetProductsById,
  httpGetProductsByCategory,
};
