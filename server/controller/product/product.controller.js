require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  getProductsById,
  getPrices,
  getProductsByCategory,
  getAllProducts,
} = require("../../model/product/products.model");

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;

/**
 */
async function httpGetAllProducts(req, res) {
  const Products = await getAllProducts();

  return await res.status(200).json(Products);
}

async function httpCreateCheckoutSession(req, res) {
  try {
    const { items } = req.body; // [{ id, quantity }, ...]

    if (!items || !items.length) {
      return res.status(400).json({ error: "No items provided" });
    }

    // 1) Grab all products from DB
    const productIds = items.map((product) => product.id);

    const produc = await getProductsById(productIds);

    // Make sure we found them
    const productsById = Object.fromEntries(
      produc.map((p) => [String(p.id), p])
    );

    // Stripe line_items
    const line_items = items.map((item) => {
      const product = productsById[item.id];

      if (!product) throw new Error(`Product not found for id ${item.id}`);

      // price in cents
      const amountInCents = Math.round(Number(product.price) * 100);

      return {
        price_data: {
          currency: "usd", // or your currency
          product_data: {
            name: product.name,
            // description: product.description, // optional
            // images: [product.imageUrl],       // optional
          },
          unit_amount: amountInCents,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    return res.status(500).json({ error: "Unable to create checkout session" });
  }
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

module.exports = {
  httpCreateCheckoutSession,
  httpGetAllProducts,
  httpGetProductsById,
  httpGetProductsByCategory,
};
