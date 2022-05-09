import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import ProductsCard from "../ProductsCard/ProductsCard";
import "./Products.scss";
import axios from "axios";

function Products({ productsContent }) {
  const apiKey = process.env.REACT_APP_API_URL;
  const params = useParams();
  const [contentByCategory, setContentByCategory] = useState(false);

  useEffect(() => {
    axios
      .get(`${apiKey}products/category/${params.category}`)
      .then((response) => {
        setContentByCategory(response.data);
      });
  }, [params.category, apiKey]);

  return (
    contentByCategory && (
      <div className="products">
        <div className="products__wrapper">
          {!params.category ? (
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
                      to={`/products/${product.id}`}
                      className="products__link"
                      key={product.id}
                    >
                      <ProductsCard key={product.id} product={product} />
                    </Link>
                  );
                })
              : contentByCategory.map((product) => {
                  return (
                    <Link
                      to={`/products/${product.id}`}
                      className="products__link"
                      key={product.id}
                    >
                      <ProductsCard key={product.id} product={product} />
                    </Link>
                  );
                })}
          </div>
        </div>
        <Outlet />
      </div>
    )
  );
}

export default Products;
