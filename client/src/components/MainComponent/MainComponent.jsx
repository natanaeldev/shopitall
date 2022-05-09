import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import HomePage from "../../pages/HomePage/HomePage";
import ProductsPage from "../../pages/ProductsPage/ProductsPage";
import SingleProductPage from "../../pages/SingleProdoctPage/SingleProductPage";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SignInPage from "../../pages/SignInPage/SignInPage";
import SignUpPage from "../../pages/SignUpPage/SignUpPage";
import CartPage from "../../pages/CartPage/CartPage";

function MainComponent() {
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
      .post(`http://localhost:8080/api/v1/users/login`, {
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
      .post(`http://localhost:8080/api/v1/register`, {
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
    console.log(e);
    axios
      .post(`http://localhost:8080/api/v1/create-checkout-session`, {
        products: data,
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const loadProducts = () => {
    axios.get(`http://localhost:8080/api/v1/products`).then((response) => {
      setProductContent(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    loadProducts();

    const token = sessionStorage.getItem("token");
    if (!token) {
      return setFailAuth(true);
    }

    axios
      .get(`http://localhost:8080/api/v1/users/current`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        setFailAuth(true);
      });
  }, []);
  return <div>MainComponent</div>;
}

export default MainComponent;
