import React, { useEffect, useState } from "react";

import CartItem from "../CartItem/CartItem";
import "./Cart.scss";

function Cart({ handleCheckout, productsContent }) {
  const [products, setProducts] = useState(false);

  const loadLocalStorageItem = () => {
    const data = JSON.parse(localStorage.getItem("products"));

    setProducts(data);
  };

  const handleRemoveItem = (product_id) => {
    var product = JSON.parse(localStorage.getItem("products"));
    const index = product.findIndex((product) => product.id === product_id);

    product.splice(index, 1);

    localStorage.setItem("products", JSON.stringify(product));
  };

  useEffect(() => {
    loadLocalStorageItem();
  }, [products]);

  return (
    <section className="cart">
      <div className="cart__wrapper">
        <div className="cart__header">
          <h2 className="cart__header-title">Cart</h2>
          <form>
            <button
              type="submit"
              onClick={() => handleCheckout(products)}
              className="cart__header-buttton"
            >
              Checkout
            </button>
          </form>
        </div>
        {!products ? (
          <div className="cart__emptyMessages">Cart Empty</div>
        ) : (
          <ul className="cart__cartitems">
            {products.map((product) => {
              return (
                <CartItem
                  products={product}
                  handleRemoveItem={() => handleRemoveItem(product.id)}
                />
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Cart;
