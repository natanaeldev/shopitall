import React from "react";
import { Link } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import "./NavBarItem.scss";

function NavBarItem({ closeMenu, success, firstname, handleSignOut }) {
  return (
    <>
      <li className="navbar-menu hideTable">
        {!success ? (
          ""
        ) : (
          <span className="navbar-menu__items-link">
            {firstname.firstname.toUpperCase()}
          </span>
        )}

        <Link to="/" className="navbar-menu__items-link" onClick={closeMenu}>
          Home
        </Link>
        <Link
          to="/products"
          className="navbar-menu__items-link"
          onClick={closeMenu}
        >
          Products
        </Link>
        <Link
          to="/about"
          className="navbar-menu__items-link"
          onClick={closeMenu}
        >
          About
        </Link>
        {!success ? (
          <Link
            to="/signin"
            className="navbar-menu__items-link"
            onClick={closeMenu}
          >
            Sign in
          </Link>
        ) : (
          <Link
            to="/"
            className="navbar-menu__items-link"
            onClick={handleSignOut}
          >
            Sign out
          </Link>
        )}
      </li>
      <li className="navbarTable-menu  hidePhone">
        {!success ? (
          <span className="navbarTable-menu__items-link ">Welcome!</span>
        ) : (
          <span className="navbarTable-menu__items-link navbarTable-menu__items-link--size">
            {firstname ? firstname.firstname.toUpperCase() : ""}
          </span>
        )}

        <Link
          to="/"
          className="navbarTable-menu__items-link"
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          to="/products"
          className="navbarTable-menu__items-link"
          onClick={closeMenu}
        >
          Products
        </Link>
        <Link
          to="/about"
          className="navbarTable-menu__items-link"
          onClick={closeMenu}
        >
          About
        </Link>
        {!success ? (
          <Link
            to="/signin"
            className="navbarTable-menu__items-link"
            onClick={closeMenu}
          >
            Sign in
          </Link>
        ) : (
          <Link
            to="/"
            className="navbarTable-menu__items-link"
            onClick={handleSignOut}
          >
            Sign out
          </Link>
        )}
        <Link to="/cart" className="navbarTable__cart ">
          <ShoppingBagOutlinedIcon className="navbarTable__cart-icon" />
          {/* <span className="navbar__count">{cartCount}</span> */}
        </Link>
      </li>
    </>
  );
}

export default NavBarItem;
