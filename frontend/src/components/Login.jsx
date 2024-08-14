import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth', {
        username,
        password,
      });
      console.log(response.data);
      navigate('/admin-dashboard');
    } catch (error) {
      console.error(error);
      // Handle login error
    }
  };
  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
