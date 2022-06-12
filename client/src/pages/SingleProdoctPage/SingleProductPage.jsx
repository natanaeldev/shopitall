import React from "react";
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import "./SingleProductPage.scss";

function SingleProductPage({ addProduct, currentUser }) {
  return (
    <section>
      <SingleProduct addProduct={addProduct} currentUser={currentUser} />
    </section>
  );
}

export default SingleProductPage;
