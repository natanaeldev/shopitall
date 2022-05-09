import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./SignIn.scss";

function SignIn({ success, error, handleSubmit }) {
  return (
    <div className="signin">
      <div className="signin__wrapper">
        <h2 className="signin__title">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className="signin__username-label">
            Username:
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="signin__username"
            />
          </label>
          <label htmlFor="password" className="signin__password-label">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="signin__password"
            />
          </label>
          <div className="signin__buttons">
            <button type="submit" className="signin__signin-button">
              Sign In
            </button>
            <Link to="/signup" className="signin__account">
              Create an account
            </Link>
            {error && <div className="signin__message">{error}</div>}
            {success && <Navigate to="/" />}
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
