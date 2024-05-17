// LoginForm.js
import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { authenticateUser } from "../AwsService"; // Import the AWS service
import "./LoginForm.css";
import "./ConfirmationCodeForm";
import ConfirmationCodeForm from "./ConfirmationCodeForm";
import LoginLogo from "../components/LoginLogo";

function LoginForm() {
  // State variables for form input, error handling, etc.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUserConfirmed, setUserConfirmed] = useState(false);
  const [error, setError] = useState("");
  const [errorTerms, setErrorforTerms] = useState("");
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);

  // Hooks for navigation and Redux
  const navigate = useNavigate();
  //const dispatch = useDispatch();

  // Event handler for checkbox change
  const handleCheckboxChange = () => {
    setTermsChecked(!isTermsChecked);
  };

  // Event handler for toggling password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Event handler for confirmation code button click
  const handleConfirmClick = () => {
    setUserConfirmed(false);
    setShowConfirmationCode(true);
  };

  // Event handler for login button click
  const handleLogin = async () => {
    // Validation checks
    if (username === "") {
      setError("Email cannot be empty.");
      setErrorforTerms("");
      return;
    }
    if (password === "") {
      setError("Password cannot be empty.");
      setErrorforTerms("");
      return;
    }
    if (!isTermsChecked) {
      setErrorforTerms("Terms and conditions must be agreed to continue.");
      setError("");
      return;
    }

    try {
      // Call the AWS Cognito authentication function
      const result = await authenticateUser(username, password);

      // Handle the authentication result
      if (!result.isConfirmed && !result.isAuthenticated) {
        console.log("User is not confirmed.");
        setError("User confirmation is required to log in.");
        // Handle logic for obtaining the confirmation code
      } else if (result.isConfirmed && result.isAuthenticated) {
        setUserConfirmed(true);

        navigate("/home");
      } else {
        setUserConfirmed(true);
        setError("Invalid email or password.");
        setErrorforTerms("");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      // Handle error as needed
    }
  };

  // Return the JSX for the component
  return (
    <div className="loginform">
      {!isUserConfirmed && showConfirmationCode ? (
        <ConfirmationCodeForm
          onCallback={() => setShowConfirmationCode(false)}
        />
      ) : (
        <>
          <div className="login-form-container">
            <div className="login-form-header">
              <div className="login-form-group">
                <LoginLogo />
              </div>
            </div>
            <div className="login-text">Log in</div>
            <div className="login-desc">
              Welcome! Please enter your details.
            </div>
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
                <label className="form-label text-md-end">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control-input"
                />
                <img
                  className="icon-olor-instance"
                  alt="Icon olor"
                  src="icon-olor-1.svg"
                  onClick={handleTogglePassword}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
            <div className="form-row-link">
              <div className="form-group-link">
                <button className="button-link" onClick={handleConfirmClick}>
                  I have a confirmation code
                </button>
                <Link className="forgot-password" to="/forgot-password">
                  Forgot password
                </Link>
              </div>
            </div>
            <div className="login-form-row-acknowledgement">
              <div className="login-form-group-acknowledgement">
                <input
                  type="checkbox"
                  checked={isTermsChecked}
                  onChange={handleCheckboxChange}
                  className="rectangle-2"
                />
                <label className="i-agree-to-all-the-t">
                  <span className="span">I agree to all the </span>
                  <a
                    href="https://www.swiirl.io/terms-and-conditions"
                    className="text-wrapper-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Term of conditions
                  </a>
                  <span className="span"> &amp; </span>
                  <a
                    href="https://www.swiirl.io/privacy-policy"
                    className="text-wrapper-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            <div className="login-form-button">
              <div className="login-form-group">
                <button
                  onClick={handleLogin}
                  className="button-primary-sw-100 btn-center"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="login-form-row">
              <div className="login-form-group">
                <p style={{ color: "red" }}>{error}</p>
              </div>
            </div>
          )}

          {errorTerms && (
            <div className="login-form-row">
              <div className="login-form-group">
                <p style={{ color: "red" }}>{errorTerms}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LoginForm;
