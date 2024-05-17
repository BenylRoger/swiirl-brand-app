// ConfirmationCode.js
import React, { useState } from "react";
import { confirmRegistration, resendConfirmationCode } from "../AwsService";

//import { login } from "../authSlice";
import "./ConfirmationCodeForm.css";

function ConfirmationCodeForm({ onCallback, userName }) {
  const buttonText = "Confirm Code";
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [resendLinkVisible, setResendLinkVisible] = useState(true);
  const [resendMessage, setResendMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(15);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationFailure, setRegistrationFailure] = useState(false);

  const handleLogin = () => {
    // Additional logic if needed
    onCallback();
  };

  const handleConfirmCode = async () => {
    try {
      await confirmRegistration(username, confirmationCode);
      setRegistrationSuccess(true);
    } catch (confirmationError) {
      console.error("Error confirming registration:", confirmationError);
      setRegistrationFailure(true);
    }
  };

  const handleResendCode = async () => {
    try {
      const message = await resendConfirmationCode(username);
      setResendMessage(message);

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
    } catch (resendError) {
      console.error("Error while resending confirmation code:", resendError);
      setResendMessage(resendError);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-text">Confirmation</div>
      <div className="login-desc">
        Welcome! Please enter your confirmation code.
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
          <label className="form-label">Confirmation Code</label>
          <input
            type="text"
            className="form-control-input"
            placeholder="Enter your confirmation code"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
        </div>
      </div>

      {resendLinkVisible && (
        <div className="login-form-row">
          <div className="login-form-group">
            <div className="forgot-password-link">
              <button className="button-link" onClick={handleResendCode}>
                Resend Confirmation Code
              </button>
            </div>
          </div>
        </div>
      )}
      {resendMessage && (
        <div className="login-form-row">
          <div className="login-form-group">
            <p className="resend-message">{resendMessage}</p>
          </div>{" "}
        </div>
      )}
      {!resendLinkVisible && (
        <div className="login-form-row">
          <div className="login-form-group">
            <p className="resend-timer-message">
              Resend link will be available in {resendTimer} seconds.
            </p>
          </div>
        </div>
      )}
      {registrationSuccess && (
        <div className="login-form-row">
          <div className="login-form-group">
            <div className="success-message">
              User registration successful and verified!{" "}
              <button className="button-link" onClick={handleLogin}>
                Login here
              </button>
            </div>{" "}
          </div>{" "}
        </div>
      )}
      {registrationFailure && (
        <div className="login-form-row">
          <div className="login-form-group">
            <div className="success-message">
              User registration failed! Try registering again.
            </div>
          </div>
        </div>
      )}
      <div className="login-form-row">
        <div className="login-form-group">
          <button
            onClick={handleConfirmCode}
            className="button-primary-sw btn-center"
          >
            <div className="text-wrapper">{buttonText}</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationCodeForm;
