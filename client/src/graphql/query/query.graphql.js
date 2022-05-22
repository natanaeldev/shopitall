import { gql } from "@apollo/client";

// DONE: create a query to get all the products

export const getAllProducts = gql`
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
export const getProductsById = gql`
  query GetProductsById($id: ID!) {
    productsById(_id: $id) {
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

// // DONE: create a query to get products by category
export const GetProductsByCategory = gql`
  query GetProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
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
