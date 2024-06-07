// RegistrationForm.js
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import "./RegistrationForm.css";
import LoginLogo from "./LoginLogo";
import LoginFooter from "./LoginFooter";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmationCode, setShowConfirmationCode] = useState(false);
  const [buttonText, setButtonText] = useState("Register");
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [resendLinkVisible, setResendLinkVisible] = useState(true);
  const [resendMessage, setResendMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(15);
  const [isUserExists, setIsUserExists] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    // Validation checks
    if (email === "") {
      setError("Email cannot be empty.");

      return;
    }
    if (password === "") {
      setError("Password cannot be empty.");

      return;
    }
    const poolData = {
      UserPoolId: "eu-north-1_fiC62d8OP",
      ClientId: "715e0qqr8h55p6qi3onn397hku",
    };

    const userPool = new CognitoUserPool(poolData);

    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        if (err.code === "UsernameExistsException") {
          console.log("User exist: ", email);

          const userPool = new CognitoUserPool(poolData);

          const authenticationData = {
            Username: email,
            Password: password,
          };
          const authenticationDetails = new AuthenticationDetails(
            authenticationData
          );

          const userData = {
            Username: email,
            Pool: userPool,
          };

          const cognitoUser = new CognitoUser(userData);
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
              console.log("User exists. Session:", session);
              setIsUserExists(true);
            },
            onFailure: (err) => {
              console.error(err);
              if (err.code === "UserNotConfirmedException") {
                setShowConfirmationCode(true);
                setButtonText("Confirm Code");
                setIsUserExists(false);
              } else {
                navigate("/forgot-password");
              }
            },
          });
        }
        return;
      }

      const cognitoUser = result.user;
      console.log("user registered:", cognitoUser);

      if (result.userConfirmed === false) {
        setShowConfirmationCode(true);
        setButtonText("Confirm Code");
        setIsUserExists(false);
      }
    });
  };

  const TicketIcon = () => (
    <img
      className="deleteicon"
      src="/Registration/delete.png"
      alt="Delete Icon"
      width="24"
      height="24"
    />
  );

  const handleConfirmCode = () => {
    console.log(confirmationCode);
    if (confirmationCode === "") {
      setError("Confirmation code cannot be empty.");

      return;
    }
    const poolData = {
      UserPoolId: "eu-north-1_fiC62d8OP",
      ClientId: "715e0qqr8h55p6qi3onn397hku",
    };

    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(
      confirmationCode,
      true,
      (confirmationErr, confirmationResult) => {
        if (confirmationErr) {
          console.error("Confirmation error:", confirmationErr);
          return;
        }
        setRegistrationSuccess(true);

        console.log("user registration confirmed:", confirmationResult);
      }
    );
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    const errors = {
      minLength: password.length >= minLength,
      hasNumber,
      hasSpecialChar,
      hasUppercase,
      hasLowercase,
    };

    return errors;
  };

  const [passwordErrors, setPasswordErrors] = useState({
    minLength: true,
    hasNumber: true,
    hasSpecialChar: true,
    hasUppercase: true,
    hasLowercase: true,
  });

  const handlePasswordChange = (password) => {
    const errors = validatePassword(password);
    setError("");
    setPasswordErrors(errors);
  };

  const handleResendCode = () => {
    const poolData = {
      UserPoolId: "eu-north-1_fiC62d8OP",
      ClientId: "715e0qqr8h55p6qi3onn397hku",
    };

    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.error("Error resending confirmation code:", err);
        setResendMessage(
          "Error resending confirmation code. Please try again."
        );
      } else {
        console.log("Confirmation code resent successfully:", result);
        setResendMessage("Confirmation code sent successfully!");
        setResendLinkVisible(false);

        let timer = 15;
        const intervalId = setInterval(() => {
          timer--;
          setResendTimer(timer);

          if (timer === 0) {
            setResendLinkVisible(true);
            setResendMessage("");
            setResendTimer(15);
            clearInterval(intervalId);
          }
        }, 1000);
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {}, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loginform">
      {!showConfirmationCode && (
        <>
          <div className="login-form-container">
            <div className="login-form-header">
              <div className="login-form-group">
                <LoginLogo />
              </div>
            </div>
            <div className="login-text">Register</div>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="login-form-row">
              <div className="login-form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handlePasswordChange(e.target.value);
                  }}
                />
                {/* <img
                  className="icon-olor-instance"
                  alt="Icon olor"
                  src="icon-olor-1.svg"
                  onClick={handleTogglePassword}
                  style={{ cursor: "pointer" }}
                /> */}
              </div>
            </div>
            {isUserExists && (
              <div className="login-form-row">
                <div className="login-form-group">
                  <div class="alert alert-info">
                    User already exists with this email!{" "}
                    <span>
                      <NavLink to="/">Login here</NavLink>
                    </span>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="login-form-row">
                <div className="login-form-group">
                  <div class="alert alert-danger">{error}</div>
                </div>
              </div>
            )}
            <div className="password-errors">
              {!passwordErrors.minLength && (
                <div className="error-message">
                  <TicketIcon />
                  <p className="validation-text">
                    Password must be at least 8 characters long.
                  </p>
                </div>
              )}
              {!passwordErrors.hasNumber && (
                <div className="error-message">
                  <TicketIcon />
                  <p className="validation-text">
                    {" "}
                    Password must contain at least 1 number.
                  </p>
                </div>
              )}
              {!passwordErrors.hasSpecialChar && (
                <div className="error-message">
                  <TicketIcon />
                  <p className="validation-text">
                    Password must contain at least 1 special character.
                  </p>
                </div>
              )}
              {!passwordErrors.hasUppercase && (
                <div className="error-message">
                  <TicketIcon />
                  <p className="validation-text">
                    {" "}
                    Password must contain at least 1 uppercase letter.
                  </p>
                </div>
              )}
              {!passwordErrors.hasLowercase && (
                <div className="error-message">
                  <TicketIcon />
                  <p className="validation-text">
                    Password must contain at least 1 lowercase letter.
                  </p>
                </div>
              )}
            </div>
            <div className="login-form-button mt-3">
              <div className="login-form-group">
                <button
                  onClick={handleSignUp}
                  className="button-primary-sw-100 btn-center"
                >
                  {buttonText}
                </button>
              </div>
            </div>
            <div className="form-row-link">
              <div className="form-group-register">
                <LoginFooter />
              </div>
            </div>
          </div>
        </>
      )}

      {showConfirmationCode && (
        <div className="login-form-container">
          <div className="login-form-header">
            <div className="login-form-group">
              <LoginLogo />
            </div>
          </div>
          <div className="login-form-row">
            <div className="login-form-group">
              <label className="form-label">Confirmation Code</label>
              <input
                type="text"
                className="form-control-input"
                placeholder="Enter confirmation code"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
            </div>
          </div>
          {resendLinkVisible && (
            <div className="form-row-link">
              <div className="form-group-link">
                <button className="button-link" onClick={handleResendCode}>
                  Resend confirmation code
                </button>
              </div>
            </div>
          )}

          {resendMessage && (
            <div className="login-form-row">
              <div className="login-form-group">
                <div
                  className={
                    resendMessage.includes("success")
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                >
                  {resendMessage}
                </div>
              </div>
            </div>
          )}
          {!resendLinkVisible && (
            <div className="login-form-row">
              <div className="login-form-group">
                <div class="alert alert-info">
                  Resend link will be available in {resendTimer} seconds.
                </div>
              </div>
            </div>
          )}

          <div className="login-form-button">
            <div className="login-form-group">
              <button
                onClick={handleConfirmCode}
                className="button-primary-sw-100 btn-center"
              >
                {buttonText}
              </button>
            </div>
          </div>
          {registrationSuccess && (
            <div className="login-form-row">
              <div className="login-form-group">
                <div class="alert alert-success">
                  User registration successful and verified!
                  <span>
                    <NavLink to="/">Login here</NavLink>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
