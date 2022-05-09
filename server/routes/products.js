const express = require("express");
const router = express.Router();
const knex = require("../knexfile-config");

router.get("/products", (req, res) => {
  knex
    .select()
    .table("products")
    .then((data) => {
      res.status(200).json(data);
    });
});

router.get("/products/:id", (req, res) => {
  const id = req.params.id;
  knex
    .select("*")
    .table("products")
    .where({ id })
    .then((data) => {
      res.status(200).json(data);
    });
});

router.get("/products/reviews/:id", (req, res) => {
  const review = "r.review";
  const id = "r.id";
  const username = "r.username";
  const create_at = "r.create_at";
  const products_id = req.params.id;

  knex
    .select({ id, review, username, create_at })
    .table({ r: "reviews" })
    .join("products", "products.id", "=", "r.products_id")
    .where({ "r.products_id": products_id })
    .then((data) => {
      res.status(200).json(data);
    });
});

// Review posting

router.post("/reviews/:id", (req, res) => {
  const { review, username } = req.body;
  const { id } = req.params;

  if (!review) res.status(403).send("Please enter a review");

  const newReview = { username, review, products_id: id };
  console.log(newReview);

  knex("reviews")
    .insert(newReview)
    .where({ id })
    .then((data) => {
      res.status(200).json("posted successfully");
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("Failed to post the reviews");
    });

  // return newReview && res.status(201).send("reviews posted");
});

router.get("/products/category/:category", (req, res) => {
  const category = req.params.category;

  knex
    .select()
    .table("products")
    .where({ category: category })
    .then((data) => {
      res.status(201).json(data);
    });
});

module.exports = router;
