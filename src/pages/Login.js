import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after login

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate authentication (replace with actual authentication logic)
    if (username === "admin" && password === "admin") {
      // Login successful
      localStorage.setItem("isLoggedIn", true); // Store login state in localStorage
      navigate("/home"); // Redirect to home page
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
