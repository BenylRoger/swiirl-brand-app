import React from "react";

import LoginForm from "../components/LoginForm";
import LoginFooter from "../components/LoginFooter";

import "./Login.css"; // Import CSS file for styling

function Login() {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <LoginForm />
        <LoginFooter page="login" />
      </div>
      <div className="login-image-wrapper">
        <img
          src="/login/image.png" // Replace with your image path
          alt="right side Login"
          className="login-image"
        />
      </div>
    </div>
  );
}

export default Login;
