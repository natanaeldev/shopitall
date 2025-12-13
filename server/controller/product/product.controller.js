require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);
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
    return { price: product.price, quantity: product.quantity };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "DO"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
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
