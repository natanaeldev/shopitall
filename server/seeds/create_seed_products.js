const products = require("../seeds_data/products.json");
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert(products);
};
