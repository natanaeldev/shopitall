import React from "react";

import Products from "../../components/Products/Products";
import "./ProductsPage.scss";

function ProductsPage({ productsContent }) {
  return (
    <section>
      <Products productsContent={productsContent} />
    </section>
  );
}

export default ProductsPage;
