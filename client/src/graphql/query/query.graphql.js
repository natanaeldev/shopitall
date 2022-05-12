import { gql } from "apollo/client";

// DONE: create a query to get all the products.
const getAllProducts = gql`
  query GetProducts {
    products {
      _id
      product_name
      image
      type
      price
      size
      description
      category
      quantity
      reviews {
        username
        date
        comment
      }
    }
  }
`;
// DONE: create a query to ge products by Id.

const getProductsById = gql`
  query GetProductsById {
    products(_id: _id) {
      _id
      product_name
      image
      type
      price
      size
      description
      category
      quantity
      reviews {
        username
        date
        comment
      }
    }
  }
`;

// TODO: create a query to get products by category

const getProductsByCategory = gql`
  query GetProductsByCategory {
    products(category: category) {
      _id
      product_name
      image
      type
      price
      size
      description
      category
      quantity
      reviews {
        username
        date
        comment
      }
    }
  }
`;

module.exports = {
  getAllProducts,
  getProductsById,
  getProductsByCategory,
};
