import React from "react";
import { Link } from "react-router-dom";
import "./SignUp.scss";

function SignUp({ userSingUp, error, handleSignUp }) {
  return (
    <div className="signup">
      <div className="signup__wrapper">
        <h2 className="signup__title">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <label htmlFor="first-name" className="signup__label">
            First Name:
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="First Name"
              className="signup__input"
            />
          </label>
          <label htmlFor="last_name" className="signup__label">
            Last Name:
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Last Name"
              className="signup__input"
            />
          </label>
          <label htmlFor="email" className="signup__label">
            Email:
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="signup__input"
            />
          </label>
          <label htmlFor="user_name" className="signup__label">
            User Name:
            <input
              type="text"
              name="user_name"
              id="user_name"
              placeholder="Username"
              className="signup__input"
            />
          </label>
          <label htmlFor="password" className="signup__label">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="signup__input"
            />
          </label>
          <div className="signup__buttons">
            <button type="submit" className="signup__signup-button">
              Sign Up
            </button>
            <Link to="/signin" className="signin__account">
              Already have an account
            </Link>
          </div>
          {error && <div className="signin__message">{error}</div>}
          {userSingUp && <span>Account created successfully</span>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
