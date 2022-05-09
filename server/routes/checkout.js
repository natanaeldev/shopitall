require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");
const router = express.Router();
const PORT = process.env.WEB_PORT;

router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: products.price_id,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${PORT}?success=true`,
    cancel_url: `${PORT}?cansceled=true`,
  });

  res.redirect(303, session.url);
});

module.exports = router;
