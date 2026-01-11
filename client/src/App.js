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

const apiKey = process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1/";

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

  const increaseQuantity = (product) => {
    // console.log(product);
    dispatch({ type: "INCREASE", payload: product });
  };

  const decreaseQuantity = (product) => {
    dispatch({ type: "DECREASE", payload: product });
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

  const handleLogIn = (e) => {
    e.preventDefault();

    let form = e.target;
    let username = form.username.value;
    let password = form.password.value;

    axios
      .post(`${apiKey}user/signin`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          form.reset();
          setSuccess(true);
          sessionStorage.setItem("token", response.data.token);
        } else {
          setFailAuth(true);
        }
      });
  };
  const handleSignOut = (e) => {
    e.preventDefault();

    if (!userSignUp) {
      sessionStorage.removeItem("token");
      setCurrentUser(null);
      setSuccess(false);
    }
  };

  const getCurrentUser = (token) => {
    try {
      if (token) {
        axios
          .get(`${apiKey}user/currentuser`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          })
          .then((response) => {
            if (response !== null) {
              setCurrentUser(response.data);
            }

            setFailAuth(true);
          });
      }
    } catch (error) {
      console.log(error);
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
      .post(`${apiKey}user/signup`, {
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
    const token = sessionStorage.getItem("token");
    loadData();

    getCurrentUser(token);
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        success={success}
        currentUser={currentUser}
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
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              sumItems={sumItems}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <SignInPage
              error={error}
              success={success}
              handleLogIn={handleLogIn}
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
