const reviews = require("../seeds_data/reviews.json");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("reviews").del();
  await knex("reviews").insert(reviews);
};
