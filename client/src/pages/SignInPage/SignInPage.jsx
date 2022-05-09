import React from "react";
import SignIn from "../../components/SignIn/SignIn";

function SignInPage({ success, error, handleSubmit }) {
  return (
    <section className="signin">
      <SignIn success={success} error={error} handleSubmit={handleSubmit} />
    </section>
  );
}

export default SignInPage;
