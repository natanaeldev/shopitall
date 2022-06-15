import React, { useEffect, useState } from "react";

import axios from "axios";

import CartItem from "../CartItem/CartItem";
import "./Cart.scss";

const apiKey = process.env.REACT_APP_API_URL;

function Cart({ removeProducts, decreaseQuantity, increaseQuantity }) {
  const [cartProducts, setCartProduct] = useState([]);
  const [totalProduct, setTotalProduct] = useState();

  const [quantity, setQuantity] = useState();

  const loadLocalStorageItem = () => {
    const product = JSON.parse(localStorage.getItem("cart"));

    let item = product.map((item) => {
      return item.default_price.unit_amount / 100;
    });

    let sum = item.reduce((accumulate, currentValue) => {
      return accumulate + currentValue;
    }, 0);

    setTotalProduct(sum);
    setCartProduct(product);
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();

    let productPrices = cartProducts.map((product) => {
      return {
        price: product.default_price.id,
        quantity: product.quantity,
      };
    });

    let response = await axios.post(
      `${apiKey}products/create-checkout-session`,
      productPrices
    );
    window.location = response.data.url;
  };

  const handleQuantityIncreament = (product) => {
    increaseQuantity(product);
  };

  const handleDecreaseQuantity = (product) => {
    decreaseQuantity(product);
  };

  useEffect(() => {
    loadLocalStorageItem();
  }, [cartProducts]);

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
        {!cartProducts ? (
          <div className="cart__emptyMessages">Cart Empty</div>
        ) : (
          <ul className="cart__cartitems">
            {cartProducts?.map((product) => {
              return (
                <CartItem
                  products={product}
                  cartProducts={cartProducts}
                  removeProducts={removeProducts}
                  decreaseQuantity={handleDecreaseQuantity}
                  increaseQuantity={handleQuantityIncreament}
                  quantity={quantity}
                />
              );
            })}
          </ul>
        )}
        <div>Total: {totalProduct} </div>
      </div>
    </section>
  );
}

export default Cart;
