import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import ProductsCard from "../ProductsCard/ProductsCard";
import "./Products.scss";

const apiKey = process.env.REACT_APP_API_URL;

function Products({ productsContent }) {
  const params = useParams();
  const category = params.category;
  const [contentByCategory, setContentByCategory] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiKey}products/category/${category}`)
      .then((response) => {
        setContentByCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  return (
    <div className="products">
      <div className="products__wrapper">
        {!category ? (
          <h2 className="productscard__title">Products</h2>
        ) : (
          <h2 className="productscard__title">
            {params.category.toUpperCase()}
          </h2>
        )}
        <div className="products__wrapperTablet">
          {!params.category
            ? productsContent.map((product) => {
                return (
                  <Link
                    to={`/products/${product._id}`}
                    className="products__link"
                    key={product.id}
                  >
                    <ProductsCard key={product._id} product={product} />
                  </Link>
                );
              })
            : contentByCategory &&
              contentByCategory.map((product) => {
                return (
                  <Link
                    to={`/products/${product._id}`}
                    className="products__link"
                    key={product.id}
                  >
                    <ProductsCard key={product._id} product={product} />
                  </Link>
                );
              })}
        </div>
      </div>
      <Outlet />
    </div>
  );

  // );
}

export default Products;
