const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Products = require("./products.mongo");

async function getAllProducts() {
  // retrive the entire list of product from the api stripe

  const products = await Products.find({});

  return products;
}

async function getProductsById(ids) {
  // retrive product by Id from the api stripe

  if (Array.isArray(ids)) {
    return await Products.find({ _id: { $in: ids } });
  }
  return await Products.findOne({ _id: ids });
}

async function getProductsByCategory(category) {
  // retrive product by category from the api stripe

  const productByCategory = await Products.find({
    category: category,
  });

  return productByCategory;
}

module.exports = {
  getProductsById,
  getProductsByCategory,
  getAllProducts,
};
