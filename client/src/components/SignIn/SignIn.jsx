import React from "react";
import { Link, Navigate } from "react-router-dom";
import { signIn } from "../../graphql/mutation/mutation.graphql";
import { useMutation } from "@apollo/client";
import "./SignIn.scss";

function SignIn({ error, success }) {
  const [setSignIn, { data, load, err }] = useMutation(signIn);

  let username;
  let password;

  if (data) {
    localStorage.setItem("token", JSON.stringify(data.signIn.token));
  }

  return (
    <div className="signin">
      <div className="signin__wrapper">
        <h2 className="signin__title">Sign In</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSignIn({
              variables: {
                input: {
                  username: username.value,
                  password: password.value,
                },
              },
            });

            username.value = "";
            password.value = "";
          }}
        >
          <label htmlFor="username" className="signin__username-label">
            Username:
            <input
              ref={(node) => {
                username = node;
              }}
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
              ref={(node) => {
                password = node;
              }}
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
