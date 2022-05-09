import React from "react";
import Cart from "../../components/Cart/Cart";

function CartPage({ handleCheckout, productsContent, handleRemoveItem }) {
  return (
    <section>
      <Cart
        handleCheckout={handleCheckout}
        handleRemoveItem={handleRemoveItem}
        productsContent={productsContent}
      />
    </section>
  );
}

export default CartPage;
