import React from "react";
import "./ProductsCard.scss";

function ProductsCard({ product }) {
  const { image, product_name, price } = product;
  return (
    <div className="productscard">
      <div className="productscard__wrapper">
        <div className="productscard__item-box">
          <img className="productscard__img" src={image} alt={product_name} />
          <div className="productscard__details">
            <span className="productscard__details-description">
              {product_name}
            </span>
            <span className="productscard__details-price">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
