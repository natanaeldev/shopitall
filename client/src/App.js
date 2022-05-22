import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAllProducts } from "./graphql/query/query.graphql";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
  ApolloProvider,
  useQuery,
  useMutation,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import axios from "axios";

import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import SingleProductPage from "./pages/SingleProdoctPage/SingleProductPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import CartPage from "./pages/CartPage/CartPage";
import AboutPage from "./pages/AboutPage/AboutPage";

import "./App.scss";
import { speedDialActionClasses } from "@mui/material";

const apiKey = process.env.REACT_APP_API_URL;

function App() {
  const [productsContent, setProductContent] = useState(null);
  const [userSignUp, setUserSignUp] = useState(false);
  const [cartCount, setcartCount] = useState(0);
  // These state belongs to the sign in pages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [failedAuth, setFailAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const { loading, errors, data } = useQuery(getAllProducts);

  const handleSignOut = (e) => {
    e.preventDefault();

    if (!userSignUp) {
      sessionStorage.removeItem("token");
      setCurrentUser(null);
      setSuccess(false);
    }
  };

  const handleCartCount = (data) => {
    if (data !== null) {
      data.forEach((element) => {
        let elements = element + 1;
        setcartCount(cartCount + elements);
      });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    let form = e.target;
    let firstname = form.first_name.value;
    let lastname = form.last_name.value;
    let email = form.email.value;
    let username = form.user_name.value;
    let password = form.password.value;

    axios
      .post(`${apiKey}register`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
      })
      .then((response) => {
        form.reset();

        setUserSignUp(response.data);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const handleCheckout = (e, data) => {
    e.preventDefault();
    e.stopPropagation();

    axios
      .post(`${apiKey}create-checkout-session`, {
        products: data,
      })
      .then((response) => {})
      .catch((error) => {});
  };

  useEffect(() => {
    if (data) {
      setProductContent(data);
    }
  }, [data]);

  return (
    <BrowserRouter>
      <NavBar
        success={success}
        firstname={currentUser}
        handleSignOut={handleSignOut}
        cartCount={cartCount}
        failedAuth={failedAuth}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={
            productsContent && (
              <ProductsPage
                productsContent={productsContent}
                // loadProducts={loadProducts}
              />
            )
          }
        />
        <Route
          path="products/:productid"
          element={
            <SingleProductPage
              handleCartCount={handleCartCount}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/products/category/:category"
          element={<ProductsPage productsContent={productsContent} />}
        />

        <Route
          path="/cart"
          element={
            <CartPage
              handleCheckout={handleCheckout}
              productsContent={productsContent}
            />
          }
        />
        <Route
          path="/signin"
          element={<SignInPage error={error} succes cs />}
        />
        <Route
          path="/signup"
          element={
            <SignUpPage
              error={error}
              userSignUp={userSignUp}
              handleSignUp={handleSignUp}
              handleCartCount={handleCartCount}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
