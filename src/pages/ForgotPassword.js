import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../AwsService"; // Import the AWS service

import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(username);
      setErrorMessage("");
      setSuccessMessage(
        "Verification code sent successfully. Check your email."
      );
      // Inside handleForgotPassword method
      navigate(`/reset-password?username=${username}`);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Error: ${error.message || JSON.stringify(error)}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="loginform">
          <div className="login-form-container">
            <div className="login-text">Forgot password</div>
            <div className="login-desc">Welcome! Please enter your email.</div>
            <div className="login-form-row">
              <div className="login-form-group">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control-input"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="login-form-row">
              <div className="login-form-group">
                <div className="back-to-link-div">
                  <Link to="/home" className="back-to-login-link">
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="login-form-row">
              <div className="login-form-group">
                <button
                  onClick={handleForgotPassword}
                  className="button-primary-sw btn-center"
                >
                  Send Verification Code
                </button>
              </div>
            </div>
            {errorMessage && (
              <div className="login-form-row">
                <div className="login-form-group">
                  <p style={{ color: "red" }}>{errorMessage}</p>
                </div>
              </div>
            )}
            {successMessage && (
              <div className="login-form-row">
                <div className="login-form-group">
                  <p style={{ color: "green" }}>{successMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>
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
};

export default ForgotPassword;
