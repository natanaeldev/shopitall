import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;

    let username = form.username.value;
    let password = form.password.value;

    axios
      .post(`${apiKey}users/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        setSuccess(true);
      })
      .catch((err) => {
        setError(err.response.data);
      });
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

  const loadProducts = () => {
    axios.get(`${apiKey}products`).then((response) => {
      setProductContent(response.data);
    });
  };

  useEffect(() => {
    loadProducts();

    const token = sessionStorage.getItem("token");
    if (!token) {
      return setFailAuth(true);
    }

    axios
      .get(`${apiKey}users/current`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        setFailAuth(true);
      });
  }, []);

  console.log(`this is a keysgit :${process.env.REACT_APP_API_URL}`);
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
                loadProducts={loadProducts}
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
          element={
            <SignInPage
              success={success}
              error={error}
              handleSubmit={handleSubmit}
            />
          }
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
