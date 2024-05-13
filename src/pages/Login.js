import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login
import { authenticateUser } from "../AwsService";
import "./Login.css"; // Import CSS file for styling

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await authenticateUser(username, password);
      if (result.isAuthenticated) {
        navigate("/home"); // Redirect to home page
      } else {
        setErrorMessage("Invalid username or password"); // Set error message
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("An error occurred during login. Please try again."); // Set error message
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-sm login-card">
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Login</h5>
          {/* Display error message if exists */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button-primary-sw w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
