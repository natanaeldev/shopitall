import React from "react";
import SignUp from "../../components/SignUp/SignUp";
import "./SignUpPage.scss";

function SignUpPage({ userSingUp, handleSignUp, error, success }) {
  return (
    <section>
      <SignUp
        error={error}
        userSingUp={userSingUp}
        handleSignUp={handleSignUp}
        success={success}
      />
    </section>
  );
}

export default SignUpPage;
