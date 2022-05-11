const {
  getAllProducts,
  getProductsById,
  getProductsByCategory,
} = require("../../../model/product/products.model");

module.exports = {
  Query: {
    products: () => {
      return getAllProducts();
    },

    productsById: (_, args) => {
      let id = args._id;
      return getProductsById(id);
    },

    productsByCategory: (_, args) => {
      let category = args.category;
      return getProductsByCategory(category);
    },
  },
};
