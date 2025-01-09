import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    error_list: [],
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const data ={
      email: formData.email,
      password: formData.password,
    }

    axios.post(`api/login`, data).then(res =>{
      if(res.data.status === 200)
      {
        localStorage.setItem('auth_token',res.data.token);
        localStorage.setItem('auth_fname',res.data.user);
        swal("Success", res.data.message, "success");
        navigate('/welcome');
      }
      else if(res.data.status === 401)
      {
        swal("Warning", res.data.message, "warning");
      }
      else
      {
        setFormData((prevData) => ({...prevData, error_list: res.data.validation_errors}));
        
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"  
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
            <span>{formData.error_list.email}</span>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span>{formData.error_list.password}</span>
          </div>
          <button type="submit" className="signup-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
