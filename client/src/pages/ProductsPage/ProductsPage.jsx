import React from "react";

import Products from "../../components/Products/Products";
import "./ProductsPage.scss";

function ProductsPage({ productsContent, loadProducts }) {
  return (
    <section>
      <Products productsContent={productsContent} loadProducts={loadProducts} />
    </section>
  );
}

export default ProductsPage;
