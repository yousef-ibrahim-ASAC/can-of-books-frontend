import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = withAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;