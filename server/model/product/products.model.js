const Products = require("./products.mongo");

async function getAllProducts() {
  return await Products.find({});
}

async function getProductsById(id) {
  return await Products.findById({ _id: id });
}

async function getProductsByCategory(category) {
  return await Products.find({ category: category });
}

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsByCategory,
};
