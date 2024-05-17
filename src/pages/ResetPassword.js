import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { resetPassword } from "../AwsService"; // Import the AWS service

import "./ResetPassword.css";

const ResetPassword = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");
    console.log("Username from query parameter:", username);
  }, [location.search]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const username = queryParams.get("username");
      await resetPassword(username, verificationCode, newPassword);
      setSuccessMessage(
        "Password reset successfully. Redirecting to login page..."
      );
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError("Error resetting password: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="limitter">
      <div className="custom-container">
        <div className="login-content">
          <div className="nav-header"></div>

          <div className="reset-password-form">
            <div className="group">
              <div className="label">Verification Code</div>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="rectangle"
              />
            </div>

            <div className="overal-1">
              <div className="group">
                <div className="label">New Password</div>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rectangle"
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
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && (
              <p style={{ color: "green" }}>{successMessage}</p>
            )}
            <div className="back-to-link-div">
              <Link to="/login" className="back-to-login-link">
                Back to Login
              </Link>
            </div>
            <button onClick={handleResetPassword} className="frame-2">
              <div className="text-wrapper">Reset Password</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
