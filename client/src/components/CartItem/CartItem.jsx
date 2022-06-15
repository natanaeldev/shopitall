import React from "react";

import "./CartItem.scss";
// import image from "../../assets/images/products-img/Man/brown-jacket.jpg";

function CartItem({
  products,
  removeProducts,
  decreaseQuantity,
  increaseQuantity,
}) {
  return (
    <li className="cartitem">
      <div className="cartitem__wrapper">
        <div className="cartitem__header">
          <img className="cartitem__header-img" src={products.images} alt="" />
        </div>
        <div className="cartitem__info">
          <div className="cartitem__info-header">
            <p className="cartitem__info-header-name">{products.name}</p>
            <p className="cartitem__info-header-title">Price:</p>
            <p className="cartitem__info-header-price">
              $
              {isNaN(products.default_price?.unit_amount / 100) === true
                ? 0
                : products.default_price?.unit_amount / 100}
            </p>
          </div>
          <div className="cartitem__info-options">
            <div className="quantity">
              <form action="">
                <button
                  className="quantity__button"
                  onClick={(e) => {
                    e.preventDefault();
                    increaseQuantity(products);
                  }}
                >
                  +
                </button>
                <span className="quantity__box">
                  {isNaN(products.quantity) === true || null
                    ? 0
                    : products.quantity}
                </span>
                <button
                  className="quantity__button"
                  onClick={(e) => {
                    e.preventDefault();
                    decreaseQuantity(products);
                  }}
                >
                  -
                </button>
              </form>
            </div>
            <button
              className="cartitem__info-button"
              onClick={() => removeProducts(products)}
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
