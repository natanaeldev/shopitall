import React from "react";
import Cart from "../../components/Cart/Cart";

function CartPage({
  handleCheckout,
  productsContent,
  decreaseQuantity,
  removeProducts,
  increaseQuantity,
  sumItems,
}) {
  return (
    <section>
      <Cart
        handleCheckout={handleCheckout}
        removeProducts={removeProducts}
        productsContent={productsContent}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        sumItems={sumItems}
      />
    </section>
  );
}

export default CartPage;
