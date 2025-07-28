// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials for testing
    if (username === 'admin' && password === 'Ahmad12354%#@#') {
      setMessage('Login successful ');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000); // delay for user feedback
    } else {
      setMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login Page</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <div className={`login-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
      </form>
    </div>
  );
}

export default Login;
