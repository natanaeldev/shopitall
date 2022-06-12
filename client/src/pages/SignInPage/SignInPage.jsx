import React from "react";
import SignIn from "../../components/SignIn/SignIn";

function SignInPage({ success, error, handleLogIn }) {
  return (
    <section className="signin">
      <SignIn success={success} error={error} handleLogIn={handleLogIn} />
    </section>
  );
}

export default SignInPage;
