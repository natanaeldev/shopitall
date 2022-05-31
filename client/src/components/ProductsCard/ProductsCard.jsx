import React from "react";
import "./ProductsCard.scss";

function ProductsCard({ product }) {
  return (
    <div className="productscard">
      <div className="productscard__wrapper">
        <div className="productscard__item-box">
          <img
            className="productscard__img"
            src={product.images}
            alt={product.name}
          />
          <div className="productscard__details">
            <span className="productscard__details-description">
              {product.name}
            </span>
            <span className="productscard__details-price">
              $
              {isNaN(product.default_price?.unit_amount / 100) === true
                ? 0
                : product.default_price?.unit_amount / 100}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
