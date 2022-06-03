import { React, useEffect, useState, useReducer } from "react";
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
import cartReducer, { sumItems } from "./hooks/reducer";

import "./App.scss";
import { speedDialActionClasses } from "@mui/material";

const apiKey = process.env.REACT_APP_API_URL;

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: cartFromStorage,
  ...sumItems(cartFromStorage),
};

function App() {
  const [productsContent, setProductContent] = useState(null);
  const [userSignUp, setUserSignUp] = useState(false);
  const [cartCount, setcartCount] = useState(0);
  // These state belongs to the sign in pages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [failedAuth, setFailAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addProduct = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const removeProducts = (product) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };

  const loadData = () => {
    const products = axios
      .get(`${apiKey}products`)
      .then((response) => {
        setProductContent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return products;
  };

  const handleSignOut = (e) => {
    e.preventDefault();

    if (!userSignUp) {
      sessionStorage.removeItem("token");
      setCurrentUser(null);
      setSuccess(false);
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

  useEffect(() => {
    loadData();
  }, []);

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
              <ProductsPage productsContent={productsContent} />
            )
          }
        />
        <Route
          path="/products/category/:category"
          element={<ProductsPage productsContent={productsContent} />}
        />
        <Route
          path="products/:productid"
          element={
            <SingleProductPage
              currentUser={currentUser}
              addProduct={addProduct}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              productsContent={productsContent}
              removeProducts={removeProducts}
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
