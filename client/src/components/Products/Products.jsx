import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import ProductsCard from "../ProductsCard/ProductsCard";
import "./Products.scss";
import { GetProductsByCategory } from "../../graphql/query/query.graphql";
import { useQuery } from "@apollo/client";

function Products({ productsContent }) {
  const params = useParams();
  const category = params.category;

  const { loading, errors, data } = useQuery(GetProductsByCategory, {
    variables: { category },
  });

  const [contentByCategory, setContentByCategory] = useState(false);

  useEffect(() => {
    if (data) {
      setContentByCategory(data);
    }
  }, [data]);

  return (
    productsContent && (
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
              ? productsContent.products.map((product) => {
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
                contentByCategory.productsByCategory.map((product) => {
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
    )
  );

  // );
}

export default Products;
