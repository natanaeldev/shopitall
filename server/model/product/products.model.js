const stripe = require("stripe")(process.env.STRIPE_KEY);
const Products = require("./products.mongo");

async function getAllStripeProducts() {
  // retrive the entire list of product from the api stripe
  const productsPriceData = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return await productsPriceData;
}

async function getProductsById(id) {
  // retrive product by Id from the api stripe
  const productById = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  return productById;
}

async function getProductsByCategory(category) {
  // retrive product by category from the api stripe
  console.log(category);
  const productByCategory = await stripe.products.search({
    query: `active:'true' AND metadata[\'category\']: \"${category}\"`,
    expand: ["data.default_price"],
  });

  return productByCategory;
}

module.exports = {
  getProductsById,
  getProductsByCategory,
  getAllStripeProducts,
};
