import React, { useEffect, useState } from "react";
import axios from "axios";

import CartItem from "../CartItem/CartItem";
import cartReducer, { sumItems } from "../../hooks/reducer";
import "./Cart.scss";

const apiKey = process.env.REACT_APP_API_URL;

function Cart({ removeProducts }) {
  const [products, setProducts] = useState([]);

  const loadLocalStorageItem = () => {
    const data = JSON.parse(localStorage.getItem("cart"));

    setProducts(data);
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();

    let productPrices = products.map((product) => {
      return {
        price: product.default_price.id,
      };
    });

    let response = await axios.post(
      `${apiKey}products/create-checkout-session`,
      productPrices
    );

    window.location = response.data.url;
  };

  useEffect(() => {
    loadLocalStorageItem();
  }, [products]);

  return (
    <section className="cart">
      <div className="cart__wrapper">
        <div className="cart__header">
          <h2 className="cart__header-title">Cart</h2>
          <form onClick={handleCheckOut}>
            <button type="submit" className="cart__header-buttton">
              Checkout
            </button>
          </form>
        </div>
        {!products ? (
          <div className="cart__emptyMessages">Cart Empty</div>
        ) : (
          <ul className="cart__cartitems">
            {products?.map((product) => {
              return (
                <CartItem products={product} removeProducts={removeProducts} />
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Cart;
