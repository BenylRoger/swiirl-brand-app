import React from "react";

import LoginForm from "../components/LoginForm";

import "./Login.css"; // Import CSS file for styling
import RightImage from "../components/RightImage";

function Login() {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <LoginForm />
      </div>
      <div className="login-image-wrapper">
        <RightImage />
      </div>
    </div>
  );
}

export default Login;
