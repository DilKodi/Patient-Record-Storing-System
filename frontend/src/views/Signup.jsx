import React, { useState } from "react";
import "./Signup.css";
import axios from 'axios'; 
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm_password: "",
    specialization: "",
    license_num: "",
    error_list:[],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data={
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      password: formData.password,
      specialization: formData.specialization,
      license_num: formData.license_num,
    }

    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post('/api/signup', data).then(res => {
      if(res.data.status === 200){
          localStorage.setItem('auth_token',res.data.token);
          localStorage.setItem('auth_fname',res.data.user);
          swal("Success", res.data.message, "success");
          navigate('/welcome');
      }
      else{
        setFormData({...formData ,error_list:res.data.validation_errors});
      }

    });
  });
};

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text" 
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
            <span>{formData.error_list.fname}</span>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
            <span>{formData.error_list.lname}</span>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
            />
            <span>{formData.error_list.password}</span>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Enter your specialization"
            />
            <span>{formData.error_list.specialization}</span>
          </div>
          <div className="form-group">
            <label>Medical License Number</label>
            <input
              type="text"
              name="license_num"
              value={formData.license_num}
              onChange={handleChange}
              placeholder="Enter your license number"
            />
            <span>{formData.error_list.license_num}</span>
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
