import { React, useState } from "react";
import Logo from "../../assets/logo/Logo.jpg";
import { Link } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import NavBarItem from "../NavBarItem/NavBarItem";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import "./NavBar.scss";

function NavBar({ success, currentUser, handleSignOut, cartCount }) {
  //States
  const [activeMenu, setActiveMenu] = useState(false);

  const handleMenu = () => {
    if (!activeMenu) setActiveMenu(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (activeMenu) setActiveMenu(false);
    document.body.style.overflow = "unset";
  };

  return (
    <nav className="navbar">
      <div className="navbar__wrapper">
        <Link to="/" className="navbar__logo-link">
          <img src={Logo} className="navbar__logo" alt="site-logo" />
        </Link>
        <div className="navbar__icons">
          {/* Mobile style */}
          <Link to="/cart" className="hideTable">
            <ShoppingBagOutlinedIcon className="navbar__cart" />
            {/* <span className="navbar__count">{cartCount}</span> */}
          </Link>
          {/* Tablet style */}
          <Link to="/cart" className="navbarTable__cart hideDesktop  hidePhone">
            <ShoppingBagOutlinedIcon className="navbarTable__cart-icon" />
            {/* <span className="navbar__count">{cartCount}</span> */}
          </Link>
          <span className="hideTable">
            <MenuIcon className="navbar__menu-icon" onClick={handleMenu} />
          </span>
        </div>
      </div>

      <div className="navbarTable__menu hidePhone">
        <ul>
          <NavBarItem
            closeMenu={closeMenu}
            success={success}
            currentUser={currentUser}
            handleSignOut={handleSignOut}
          />
        </ul>
      </div>

      {activeMenu && (
        <div className="navbar__menu hideTable">
          <div>
            <ClearIcon
              className="navbar__menu-clear-icon"
              onClick={closeMenu}
            />
          </div>
          <ul className="navbar__menu-list">
            <NavBarItem
              closeMenu={closeMenu}
              success={success}
              currentUser={currentUser}
              handleSignOut={handleSignOut}
            />
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
