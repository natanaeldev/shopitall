import React from "react";
import SignIn from "../../components/SignIn/SignIn";

function SignInPage({ success, error, mutateSignIn }) {
  return (
    <section className="signin">
      <SignIn success={success} error={error} mutateSignIn={mutateSignIn} />
    </section>
  );
}

export default SignInPage;
