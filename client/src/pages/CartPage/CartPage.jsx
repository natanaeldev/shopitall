import React from "react";
import Cart from "../../components/Cart/Cart";

function CartPage({ handleCheckout, productsContent, removeProducts }) {
  return (
    <section>
      <Cart
        handleCheckout={handleCheckout}
        removeProducts={removeProducts}
        productsContent={productsContent}
      />
    </section>
  );
}

export default CartPage;
