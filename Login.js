import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../services/Customer-API";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await authenticate(username, password);
      if (response.token) {
        alert("Login successful");
        navigate("/customer/list");
      } else {
        setError("Authentication failed: No token received");
      }
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else if (err.response) {
        console.error("Server responded with an error:", err.response);
        setError(`Error: ${err.response.status} ${err.response.data}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setError("Network error: No response received from server");
      } else {
        console.error("Error in setting up request:", err.message);
        setError("Network error");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
