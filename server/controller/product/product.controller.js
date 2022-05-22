require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
const {
  getProductsById,
  getAllProducts,
  getProductsByCategory,
} = require("../../model/product/products.model");

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

async function httpGetAllProducts(req, res) {
  await getAllProducts().then((product) => {
    return res.status(200).json(product);
  });
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
      res.status(404).json({ message: "products not found" });
    });
}

async function httpCreateProduct(req, res) {
  const products = await getAllProducts();

  products.forEach(async (product) => {
    await stripe.products.create({
      name: product.product_name,
      id: product._id,
    });
  });
}

async function httpCreatePrice(req, res) {
  const data = req.body;
  const product = await getProductsById(data._id);

  const price = await stripe.prices.create({
    unit_amount: product.price,
    currency: "usd",
    product: product._id.toString(),
  });
}

async function httpCreateCheckOutSessions(req, res) {
  const data = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: `{{${price}}}`,
        quantity: data.quatity,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
}

module.exports = {
  httpCreateProduct,
  httpCreatePrice,
  httpCreateCheckOutSessions,
  httpGetAllProducts,
  httpGetProductsById,
  httpGetProductsByCategory,
};
