import React from "react";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import "./SingleProductPage.scss";

function SingleProductPage({ handleCartCount, currentUser }) {
  return (
    <section>
      <SingleProduct
        handleCartCount={handleCartCount}
        currentUser={currentUser}
      />
    </section>
  );
}

export default SingleProductPage;
