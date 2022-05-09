import React from "react";

import "./CartItem.scss";
// import image from "../../assets/images/products-img/Man/brown-jacket.jpg";

function CartItem({ products, handleRemoveItem }) {
  return (
    <li className="cartitem">
      <div className="cartitem__wrapper">
        <div className="cartitem__header">
          <img className="cartitem__header-img" src={products.image} alt="" />
        </div>
        <div className="cartitem__info">
          <div className="cartitem__info-header">
            <p className="cartitem__info-header-name">
              {products.product_name}
            </p>
            <p className="cartitem__info-header-title">Price:</p>
            <p className="cartitem__info-header-price">${products.price}</p>
          </div>
          <div className="cartitem__info-options">
            <label
              htmlFor="size"
              className="singleproduct__secundary-details-label"
            >
              Size:
            </label>
            <select
              name="size"
              id="size"
              className="singleproduct__secundary-details-select"
            >
              <option value="S">S</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="XL">XL</option>
            </select>
            <button
              className="cartitem__info-button"
              onClick={handleRemoveItem}
            >
              Remove Item
            </button>
          </div>

          <div className="cartitem__description">
            <h3 className="cartitem__description-title">Description</h3>
            <p className="cartitem__description-paragraph">
              {products.description}
              {/* Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. */}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
